module.exports = {
    "extends": "stylelint-config-standard",
    "rules": {
        "selector-type-case": "lower",
        "selector-class-pattern": "^[a-z]+-+[a-z]+$|^[a-z]+$" //只能匹配header-item或logo的类选择器名
    }
}
