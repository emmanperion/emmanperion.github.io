let Helpers = {
    arraySort(array) {
        return _.sortBy(array, function (o) {
            return o.value;
        })
    },
    arrayToLowerCase(array) {
        return _.each(array, function (obj) {
            obj.value = obj.value.toLowerCase();
        });
    },
};