let app = new Vue({
    el  : '#app',
    data: {
        utm_source             : '',
        utm_medium             : '',
        utm_content            : '',
        utmContentsOptions     : [],
        url                    : '',
        sale_id                : '',
        utm_campaign           : '',
        market_place           : '',
        year                   : '',
        quarter                : '',
        month                  : '',
        region                 : '',
        countries              : '',
        countriesSearch        : '',
        isCountriesModalActive : false,
        countriesOptions       : [],
        languages              : '',
        languagesSearch        : '',
        isLanguagesModalActive : false,
        languagesOptions       : [],
        auction_type           : '',
        email_number           : '',
        categories             : '',
        categoriesSearch       : '',
        isCategoriesModalActive: false,
        categoriesOptions      : [],
        contentMarker          : '',
        contentMarkerOptions   : [],
        proceed                : true,
        result                 : ''
    },

    mounted() {
        Setters.setFixedValues(this);
        Setters.setDefaultValues(this);
        this.categoriesOptions    = Options.loadCategories();
        this.countriesOptions     = Options.loadCountries();
        this.languagesOptions     = Options.loadLanguages();
        this.utmContentsOptions   = Options.loadUtmContents();
        this.contentMarkerOptions = Options.loadContentMarkerContents();
    },

    methods: {
        generateUTM: function () {
            // Sale ID | Validation
            if (this.sale_id == '') {
                alert('Sale ID is Required!');
                this.proceed = false;
            } else {
                this.proceed = true;
            }

            // Email Number | Validation
            if (this.email_number == '') {
                alert('Email Number is Required!');
                this.proceed = false;
            } else {
                this.proceed = true;
            }

            if (this.proceed) {
                // Set categories
                let categories     = _.uniq(this.selectedCategories, 'value');
                let tempCategories = '';
                categories.forEach(function (item, index) {
                    tempCategories += index > 0 ? '/' : '';
                    tempCategories += item.value.toLowerCase();
                });
                this.categories = tempCategories;

                // Set Countries
                let tempCountries = '';
                this.selectedCountries.forEach(function (item, index) {
                    tempCountries += index > 0 ? '_' : '';
                    tempCountries += item.value.toLowerCase();
                });
                this.countries = tempCountries;

                // Set Languages
                let tempLanguages = '';
                this.selectedLanguages.forEach(function (item, index) {
                    tempLanguages += index > 0 ? '_' : '';
                    tempLanguages += item.value.toLowerCase();
                });
                this.languages = tempLanguages;

                this.utm_campaign = this.market_place.toLowerCase() + '_' + this.year + '_' + this.quarter.toLowerCase() + '_' + this.month.toLowerCase() + '_' + this.region.toLowerCase() + '_' + this.countries + '_' + this.languages + '_' + this.sale_id + '_' + this.auction_type.toLowerCase() + '_' + 'e' + this.email_number + '_' + this.categories;

                if (this.utm_content !== '') {
                    this.result = this.url + this.sale_id + '&utm_source=' + this.utm_source.toLowerCase() + "&utm_medium=" + this.utm_medium.toLowerCase() + "&utm_content=" + this.utm_content.toLowerCase() + "&utm_campaign=" + this.utm_campaign + (this.contentMarker !== '' ? this.contentMarker : '');
                } else {
                    this.result = this.url + this.sale_id + '&utm_source=' + this.utm_source.toLowerCase() + "&utm_medium=" + this.utm_medium.toLowerCase() + "&utm_campaign=" + this.utm_campaign + (this.contentMarker !== '' ? this.contentMarker : '');
                }
            }
        },

        toggleCategoriesModal: function () {
            this.isCategoriesModalActive == true ? this.isCategoriesModalActive = false : this.isCategoriesModalActive = true;
        },

        toggleCountriesModal: function () {
            this.isCountriesModalActive == true ? this.isCountriesModalActive = false : this.isCountriesModalActive = true;
        },

        toggleLanguagesModal: function () {
            this.isLanguagesModalActive == true ? this.isLanguagesModalActive = false : this.isLanguagesModalActive = true;
        },

        resetForm: function () {
            let confirm = window.confirm("Are you sure you want to reset the form?");

            if (confirm) {
                Setters.setFixedValues(this);
                Setters.setDefaultValues(this);
                Setters.setFieldsToBlank(this);
                this.categoriesOptions = Options.loadCategories();
                this.countriesOptions  = Options.loadCountries();
                this.languagesOptions  = Options.loadLanguages();
            }
        }
    },

    computed: {
        selectedCategories: function () {
            return this.categoriesOptions.filter(selectedCategory => selectedCategory.selected);
        },

        selectedCountries: function () {
            return this.countriesOptions.filter(selectedCountry => selectedCountry.selected);
        },

        selectedLanguages: function () {
            return this.languagesOptions.filter(selectedLanguage => selectedLanguage.selected);
        },

        filteredCategories: function () {
            let self = this;
            return this.categoriesOptions.filter(function (item) {
                return item.name.toLowerCase()
                        .indexOf(self.categoriesSearch.toLowerCase()) >= 0;
            });
        },

        filteredCountries: function () {
            let self = this;
            return this.countriesOptions.filter(function (item) {
                return item.name.toLowerCase()
                        .indexOf(self.countriesSearch.toLowerCase()) >= 0;
            });
        },

        filteredLanguages: function () {
            let self = this;
            return this.languagesOptions.filter(function (item) {
                return item.name.toLowerCase()
                        .indexOf(self.languagesSearch.toLowerCase()) >= 0;
            });
        }
    }
});