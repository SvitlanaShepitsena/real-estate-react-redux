import React from 'react';
import Grid, {Cell} from 'react-mdl/lib/Grid';
import {Card, CardTitle, CardActions} from 'react-mdl/lib/Card';

if (process.env.BROWSER) {
    require('./HomeList.less');
}

export default class HomeList extends React.Component {

    render() {
        return (
            <div className='HomeList'>
                <Grid >
                    <Cell
                        align="top"
                        col={4}
                        tablet={6}
                        phone={12}>
                        <Card shadow={0}
                              className="HomeList__card-image"
                              style={{ background: 'url(http://farm3.static.flickr.com/2711/4369664710_3c94dbffbc.jpg) center / cover' }}>
                            <CardTitle expand/>
                            <CardActions
                                style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                    <span
                                        style={{color: '#fff', fontSize: '18px', fontWeight: '400'}}> Skokie Real Estate </span>
                            </CardActions>
                        </Card>
                    </Cell>
                    <Cell
                        col={4}
                        tablet={6}
                        phone={12}>
                        <Card shadow={0}
                              className="HomeList__card-image"
                              style={{ background: 'url(https://c2.staticflickr.com/6/5033/5860167175_3c153d1c98_b.jpg) center / cover' }}>
                            <CardTitle expand/>
                            <CardActions
                                style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                    <span
                                        style={{color: '#fff', fontSize: '18px', fontWeight: '400'}}> Northbrook Real Estate </span>
                            </CardActions>
                        </Card>
                    </Cell>
                    <Cell
                        col={4}
                        tablet={6}
                        phone={12}>
                        <Card shadow={0}
                              className="HomeList__card-image"
                              style={{ background: 'url(http://i287.photobucket.com/albums/ll152/urbansurfin/Chicago08013.jpg) center / cover' }}>
                            <CardTitle expand/>
                            <CardActions
                                style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                    <span
                                        style={{color: '#fff', fontSize: '18px', fontWeight: '400'}}> Glenview Real Estate </span>
                            </CardActions>
                        </Card>
                    </Cell>
                </Grid>
            </div>
        );
    }
}
