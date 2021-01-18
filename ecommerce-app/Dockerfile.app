FROM atfuentess/qa-automation:wordpress_automation

WORKDIR /var/www/html

COPY ecommerce-app/app /var/www/html
COPY ecommerce-app/data/php.conf.ini /usr/local/etc/php/conf.d/conf.ini

EXPOSE 80
