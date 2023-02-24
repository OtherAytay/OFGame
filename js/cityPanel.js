function cityPanel({city, spec, market, posts}) {
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
            'h3',
            {class: "card-subtitle text-center text-" + specCode},
            spec
        ),
        React.createElement(
            'div',
            {class: "card-body px-2"},
            React.createElement(
                'p',
                {class: "card-text text-center fs-6"},
                null
            ),
            React.createElement(
                'div',
                {class: "accordion", id: "cityPanelOptions"},
                React.createElement(
                    'div',
                    {class: "accordion-item"},
                    React.createElement(
                        'div',
                        {class: "accordion-header", id: "headingOne"},
                        React.createElement(
                            'button',
                            {
                                class: "accordion-button",
                                type: "button",
                                'data-bs-toggle': "collapse",
                                'data-bs-target': "#collapseOne",
                                'aria-expanded': "true",
                                'aria-controls': "collapseOne",
                            },
                            Contracts
                        )
                    ),
                    React.createElement(
                        'div',
                        {
                            class: "accordion-collapse collapse show", 
                            id: "collapseOne",
                            'aria-labelledby': "headingOne",
                            'data-bs-target': "#cityPanelOptions"
                        },
                        React.createElement(
                            'div',
                            {class: "accordion-body"},
                            React.createElement(

                            )
                        )
                    )
                )
            )
        )
    )
}