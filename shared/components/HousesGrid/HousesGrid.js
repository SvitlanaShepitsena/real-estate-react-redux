import React from 'react';
import cx    from 'classnames';
import {Tab, Tabs}  from 'react-mdl/lib/Tabs';
import Grid, {Cell} from 'react-mdl/lib/Grid';
import Spinner from 'react-mdl/lib/Spinner';

import HouseCard from '../HouseCard/HouseCard.js';

import config from '../../../etc/settings';
const settings = config();

if (process.env.BROWSER) {
    require('./HousesGrid.less');
}

const CATEGORIES = ['ALL', 'FORECLOSURE', 'SHORT SALE'];

export default class HousesGrid extends React.Component {
    static contextTypes = {i18n: React.PropTypes.object};

    static propTypes = {
        articles: React.PropTypes.arrayOf(React.PropTypes.object),
        onItemClick: React.PropTypes.func,
    };

    renderContent = () => {
        console.log();
        const {l} = this.context.i18n;
        const {articles, isLoading, isEmpty, onItemClick} = this.props;

        if (isLoading) {
            return <Spinner className='HousesGrid__spinner'/>;
        }

        if (isEmpty) {
            return (
                <div className='HousesGrid__empty-state'>
                    {l('There are no articles in this category yet')}
                </div>
            );
        }

        return (
            <Grid className='HousesGrid__grid'>
                {articles.map(article =>
                    <Cell
                        key={article.youtubeId}
                        align='top'
                        col={6}
                        tablet={6}
                        phone={12}>
                        <HouseCard name={article.title}>
                            <div>
                                <img className="HousesGrid__youtube"
                                     src={settings.houseImageThumb}/>
                            </div>
                        </HouseCard>
                    </Cell>
                )}
            </Grid>
        );
    };

    render() {
        const {
            selectedCategory,
            isLoading,
            onTabChange,
        } = this.props;

        const {l} = this.context.i18n;

        const classes = cx('HousesPage', {
            'HousesPage--loading': isLoading
        });
        return (
            <div className={classes}>
                {/*
                 <div className='HousesGrid__header'>
                 <div className='HousesGrid__tab-bar'>
                 <Tabs
                 ripple={true}
                 activeTab={selectedCategory ? CATEGORIES.indexOf(selectedCategory) : 0}
                 className='HousesGrid__tabs'
                 onChange={(index) => onTabChange(CATEGORIES[index])}>
                 <Tab>{l('All Listings')}</Tab>
                 <Tab>{l('Foreclosure')}</Tab>
                 <Tab>{l('Short Sale')}</Tab>
                 </Tabs>
                 </div>
                 </div>
                 */}
                <div style={{ maxWidth: '1200', margin:' 0 auto' }}>
                    <h2 style={{textAlign:'left'}}>Houses For Sale</h2>
                    <hr/>
                </div>
                <div className='HousesGrid__content'>
                    {this.renderContent()}
                </div>
            </div>
        );
    }
}
