let Setters = {
    setFixedValues(object) {
        object.utm_source  = 'eloqua';
        object.utm_medium  = 'email';
        object.utm_content = 'time';
        object.url         = 'http://www.go-dove.com/en/events?cmd=details&event=';
    },
    setDefaultValues(object) {
        object.market_place = 'GIDB';
        object.year         = '2018';
        object.quarter      = 'Q1';
        object.month        = 'jan';
        object.region       = 'APAC';
        object.auction_type = 'IA';
        object.proceed      = false;
        object.utm_content  = '';
    },
    setFieldsToBlank(object) {
        object.email_number     = '';
        object.sale_id          = '';
        object.result           = '';
        object.utm_campaign     = '';
        object.countriesSearch  = '';
        object.categoriesSearch = '';
        object.languagesSearch  = '';
    }
};