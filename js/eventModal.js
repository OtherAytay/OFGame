function eventModal({ pos, severity, eventNum }) {
    var details = getEventDetails({ pos: pos, severity: severity, eventNum: eventNum })

    return React.createElement(
        'div',
        {
            class: "modal-dialog modal-dialog-centered",
            id: "active-event"
        },
        React.createElement(
            'div',
            { class: "modal-content" },
            React.createElement(
                'div',
                { class: "modal-header" },
                React.createElement(
                    'h1',
                    { class: "modal-title fs-3 fw-bold text-center" },
                    details.name
                )
            ),
            React.createElement(
                'div',
                { class: "modal-body text-center" },
                React.createElement(
                    'p',
                    null,
                    details.text
                ),
                React.createElement('hr'),
                React.createElement(
                    'p',
                    null,
                    React.createElement('span', { class: "text-primary, fw-bold" }, "Effect"),
                    ": ",
                    details.effect
                )
            ),
            React.createElement(
                'div',
                { class: "modal-footer" },
                React.createElement(
                    'button',
                    {
                        class: "btn btn-primary",
                        type: "button",
                        onClick: () => { processEvent({ pos: pos, severity: severity, eventNum: eventNum }) }
                    },
                    "Ok"
                )
            )
        )
    )
}