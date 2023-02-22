function cityPanel({city, spec, market}) {
    var specCode = specCoding(spec);

    return React.createElement(
        'div',
        {class: "card border-primary my-5"},
        React.createElement(
            'h1',
            {class: "card-title text-center"},
            Paris
        ),
        React.createElement(
            'h1',
            {class: "card-subtitle text-center text-" + specCode},
            spec
        )
    )
}