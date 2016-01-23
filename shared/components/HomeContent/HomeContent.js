import React from 'react';
import Grid, {Cell} from 'react-mdl/lib/Grid';
import Button      from 'react-mdl/lib/Button';
import HomeList from '../HomeList/HomeList.js';

if (process.env.BROWSER) {
    require('./HomeContent.less');
}

export default class HomeContent extends React.Component {

    render() {
        return (
            <div className='HomePage'>
                <Grid>
                    <Cell col={12}>
                        <div style={{margin:'0px auto',textAlign:'center'}}>
                            <img
                                src="http://res.cloudinary.com/svitlana/image/upload/v1453490978/remax-1st-class-logo_gjc14e.png"
                                alt="Re/max 1st Class Logo"/>
                            <h1 className="HomePage_h1">You need only one company <br/> for all your real estate needs
                            </h1>
                        </div>
                    </Cell>
                    <Cell col={12}>
                        <div style={{margin:'0px auto'}} className="HomePage__videoContent">
                        </div>
                    </Cell>

                </Grid>
                <div className="HomePage_iconsContainer">
                    <div className="HomePage_slider">
                        <HomeList></HomeList>
                    </div>
                </div>
                <div className="HomePage_sliderContainer">
                    <div className="HomePage_slider">
                        <HomeList></HomeList>
                    </div>
                </div>
            </div>
        );
    }
}
