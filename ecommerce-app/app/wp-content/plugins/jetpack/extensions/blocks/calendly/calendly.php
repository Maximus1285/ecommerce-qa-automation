<?php
/**
 * Calendly Block.
 *
 * @since 8.2.0
 *
 * @package Jetpack
 */

namespace Automattic\Jetpack\Extensions\Calendly;

use Jetpack_Gutenberg;

const FEATURE_NAME = 'calendly';
const BLOCK_NAME   = 'jetpack/' . FEATURE_NAME;

/**
 * Registers the block for use in Gutenberg
 * This is done via an action so that we can disable
 * registration if we need to.
 */
function register_block() {
	jetpack_register_block(
		BLOCK_NAME,
		array(
			'render_callback' => __NAMESPACE__ . '\load_assets',
			'plan_check'      => true,
		)
	);
}
add_action( 'init', __NAMESPACE__ . '\register_block' );

/**
 * Calendly block registration/dependency declaration.
 *
 * @param array  $attr    Array containing the Calendly block attributes.
 * @param string $content String containing the Calendly block content.
 *
 * @return string
 */
function load_assets( $attr, $content ) {

	if ( is_admin() ) {
		return;
	}
	$url = Jetpack_Gutenberg::validate_block_embed_url(
		get_attribute( $attr, 'url' ),
		array( 'calendly.com' )
	);
	if ( empty( $url ) ) {
		return;
	}

	/*
	 * Enqueue necessary scripts and styles.
	 */
	Jetpack_Gutenberg::load_assets_as_required( FEATURE_NAME );
	wp_enqueue_script(
		'jetpack-calendly-external-js',
		'https://assets.calendly.com/assets/external/widget.js',
		null,
		JETPACK__VERSION,
		true
	);

	$style                          = get_attribute( $attr, 'style' );
	$hide_event_type_details        = get_attribute( $attr, 'hideEventTypeDetails' );
	$background_color               = get_attribute( $attr, 'backgroundColor' );
	$text_color                     = get_attribute( $attr, 'textColor' );
	$primary_color                  = get_attribute( $attr, 'primaryColor' );
	$submit_button_text             = get_attribute( $attr, 'submitButtonText' );
	$submit_button_classes          = get_attribute( $attr, 'submitButtonClasses' );
	$submit_button_text_color       = get_attribute( $attr, 'customTextButtonColor' );
	$submit_button_background_color = get_attribute( $attr, 'customBackgroundButtonColor' );
	$classes                        = Jetpack_Gutenberg::block_classes( FEATURE_NAME, $attr, array( 'calendly-style-' . $style ) );
	$block_id                       = wp_unique_id( 'calendly-block-' );

	$url = add_query_arg(
		array(
			'hide_event_type_details' => (int) $hide_event_type_details,
			'background_color'        => sanitize_hex_color_no_hash( $background_color ),
			'text_color'              => sanitize_hex_color_no_hash( $text_color ),
			'primary_color'           => sanitize_hex_color_no_hash( $primary_color ),
		),
		$url
	);

	if ( 'link' === $style ) {
		wp_enqueue_style( 'jetpack-calendly-external-css', 'https://assets.calendly.com/assets/external/widget.css', null, JETPACK__VERSION );

		/*
		 * If we have some additional styles from the editor
		 * (a custom text color, custom bg color, or both )
		 * Let's add that CSS inline.
		 */
		if ( ! empty( $submit_button_text_color ) || ! empty( $submit_button_background_color ) ) {
			$inline_styles = sprintf(
				'#%1$s .wp-block-button__link{%2$s%3$s}',
				esc_attr( $block_id ),
				! empty( $submit_button_text_color )
					? 'color:#' . sanitize_hex_color_no_hash( $submit_button_text_color ) . ';'
					: '',
				! empty( $submit_button_background_color )
					? 'background-color:#' . sanitize_hex_color_no_hash( $submit_button_background_color ) . ';'
					: ''
			);
			wp_add_inline_style( 'jetpack-calendly-external-css', $inline_styles );
		}

		$content = sprintf(
			'<div class="wp-block-button %1$s" id="%2$s"><a class="%3$s" role="button" onclick="Calendly.initPopupWidget({url:\'%4$s\'});return false;">%5$s</a></div>',
			esc_attr( $classes ),
			esc_attr( $block_id ),
			! empty( $submit_button_classes ) ? esc_attr( $submit_button_classes ) : 'wp-block-button__link',
			esc_js( $url ),
			wp_kses_post( $submit_button_text )
		);
	} else { // Inline style.
		$content = sprintf(
			'<div class="%1$s" id="%2$s"></div>',
			esc_attr( $classes ),
			esc_attr( $block_id )
		);
		$script  = <<<JS_END
Calendly.initInlineWidget({
	url: '%s',
	parentElement: document.getElementById('%s'),
	inlineStyles: false,
});
JS_END;
		wp_add_inline_script( 'jetpack-calendly-external-js', sprintf( $script, esc_url( $url ), esc_js( $block_id ) ) );
	}

	return $content;
}

/**
 * Get filtered attributes.
 *
 * @param array  $attributes     Array containing the Calendly block attributes.
 * @param string $attribute_name String containing the attribute name to get.
 *
 * @return string
 */
function get_attribute( $attributes, $attribute_name ) {
	if ( isset( $attributes[ $attribute_name ] ) ) {
		return $attributes[ $attribute_name ];
	}

	$default_attributes = array(
		'style'                => 'inline',
		'submitButtonText'     => esc_html__( 'Schedule time with me', 'jetpack' ),
		'backgroundColor'      => 'ffffff',
		'textColor'            => '4D5055',
		'primaryColor'         => '00A2FF',
		'hideEventTypeDetails' => false,
	);

	if ( isset( $default_attributes[ $attribute_name ] ) ) {
		return $default_attributes[ $attribute_name ];
	}
}
