# Data Model

    contacts: {
        "uuid": { // not everybody will have an email
            ...
        },

        "uuid": {
            ...
            conversations: {
                "uuid": true,
                "uuid": true
            }
        }
    },

    contacts-by-email: {
        "email": "uuid",
        "email": "uuid",
        "email": "uuid"
    }

    contacts-by-phone: {
        "phone": "uuid"
    }

    contacts-by-organization: {
        "org name": {
            "uuid": true,
            "uuid": true
        }
    }

    organizations: {
        "name": {
            "name",
            "contacts"
        }
    }

    conversations: {
        "uuid": {
            body,
            date,
            ...
        },
    }

    conversations-by-contact: { // two conversation indexes? on by contact, one by date
        "contact-ident": {
            "uuid": true,
            "uuid": true
        },

        "contact-ident": {
            "uuid": true,
            "uuid": true,
            "uuid": true
        }
    },

    conversations-by-date: {
        date999: {
            "uuid": true,
            "uuid": true
        },

        date998: {
            "uuid": true,
            "uuid": true
        }
    }
