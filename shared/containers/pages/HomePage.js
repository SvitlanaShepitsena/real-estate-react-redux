import React from 'react';
import HomeContent from '../../components/HomeContent/HomeContent.js';
import Helmet from "react-helmet";
import {fbImage, appImage, appTitle, appType, appUrl, ogProps} from "../../config.js";
export default class HomePage extends React.Component {
    // Constructor
    constructor(props) {
        // Running constructor of Parent (React.Component) for binding this to object.
        // Dynamically assigned global property This is always a component itself.
        super(props);
    }

    render() {
        const home = ogProps.homePage;
        return (
            <div style={{minHeight:1000}}>
                <Helmet
                    title={appTitle}

                    meta={[
                    {"name": "url", "content": `${appUrl}`},
                    {"name": "type", "content": `${appType}`},
                    {"name": "image", "content": `${fbImage}`},
                    {"name": "description", "content": `${home.description}`},
                    {"property": "og:url", "content": `${appUrl}`},
                    {"property": "og:type", "content": `${appType}`},
                    {"property": "og:title", "content": `${appTitle}`},
                    {"property": "og:image", "content": `${fbImage}`},
                    {"property": "og:description", "content": `${home.description}`}
                ]}
                />
                <HomeContent></HomeContent>
            </div>
        )
    }

}