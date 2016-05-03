function register (Vue) {
    Vue.filter("nice-date", function (val) {
        return new Date(val).toLocaleDateString();
    });

    Vue.filter("ellipsize", function ellipsize (val) {
        return val.slice(0, 250) + "...";
    });
}

module.exports = register;
