import React from 'react';
import Grid, {Cell} from 'react-mdl/lib/Grid';
import {Card, CardTitle, CardActions} from 'react-mdl/lib/Card';
import {Link} from 'react-router';

if (process.env.BROWSER) {
    require('./HomePageCities.less');
}

export default class HomePageCities extends React.Component {

    render() {
        return (
            <div className='HomePageCities'>
                <Grid >
                    <Cell
                        align="top"
                        col={4}
                        tablet={6}
                        phone={12}>
                        <Link to="/houses-for-sale/skokie" style={{textDecoration:'none'}}>
                            <Card shadow={0}
                                  className="HomePageCities__card-image"
                                  style={{ background: 'url(http://res.cloudinary.com/svitlana/image/upload/v1453658894/skokie-downtown_rdnonv.jpg) center / cover' }}>
                                <CardTitle expand/>
                                <CardActions
                                    style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                    <span
                                        style={{color: '#fff', fontSize: '18px', fontWeight: '400'}}> Skokie Real Estate </span>
                                </CardActions>
                            </Card>
                        </Link>
                    </Cell>
                    <Cell
                        col={4}
                        tablet={6}
                        phone={12}>
                        <Link to="/houses-for-sale/northbrook" style={{textDecoration:'none'}}>
                            <Card shadow={0}
                                  className="HomePageCities__card-image"
                                  style={{ background: 'url(http://res.cloudinary.com/svitlana/image/upload/v1453662336/northbrook-image-mockup_fksvx3.jpg) center / cover' }}>
                                <CardTitle expand/>
                                <CardActions
                                    style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                    <span
                                        style={{color: '#fff', fontSize: '18px', fontWeight: '400'}}> Northbrook Real Estate </span>
                                </CardActions>
                            </Card>
                        </Link>
                    </Cell>
                    <Cell
                        col={4}
                        tablet={6}
                        phone={12}>
                        <Link to="/houses-for-sale/glenview" style={{textDecoration:'none'}}>
                            <Card shadow={0}
                                  className="HomePageCities__card-image"
                                  style={{ background: 'url(http://res.cloudinary.com/svitlana/image/upload/v1454078423/glenview-mockup_zniuuy.jpg) center / cover' }}>
                                <CardTitle expand/>
                                <CardActions
                                    style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                    <span
                                        style={{color: '#fff', fontSize: '18px', fontWeight: '400'}}> Glenview Real Estate </span>
                                </CardActions>
                            </Card>
                        </Link>
                    </Cell>
                </Grid>
            </div>
        );
    }
}
