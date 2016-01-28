import React from 'react';
import Helmet from 'react-helmet';
import ContactForm from '../../components/Contact/ContactForm.js';
import {fbImage, appType, ogProps} from "../../config.js";

export default class ContactsPage extends React.Component {
    // Constructor
    constructor(props) {
        // Running constructor of Parent (React.Component) for binding this to object.
        // Dynamically assigned global property This is always a component itself.
        super(props);
    }

    render() {
        const contacts = ogProps.contactsPage;
        return (
            <div>
                <Helmet
                    title={contacts.title}
                    meta={[
                    {"name": "url", "content": `${contacts.url}`},
                    {"name": "type", "content": `${appType}`},
                    {"name": "title", "content": `${contacts.title}`},
                    {"name": "image", "content": `${fbImage}`},
                    {"name": "description", "content": `${contacts.description}`},
                    {"property": "og:url", "content": `${contacts.url}`},
                    {"property": "og:type", "content": `${appType}`},
                    {"property": "og:title", "content": `${contacts.title}`},
                    {"property": "og:image", "content": `${fbImage}`},
                    {"property": "og:description", "content": `${contacts.description}`}
                ]}
                />
                <h1> Contact Us </h1>
                <hr/>
                <ContactForm />
            </div>
        )
    }
}