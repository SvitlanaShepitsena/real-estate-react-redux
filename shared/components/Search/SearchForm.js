'use strict';

import React, {Component, PropTypes} from 'react';
import Button      from 'react-mdl/lib/Button';
import cx                            from 'classnames';
import Grid, {Cell} from 'react-mdl/lib/Grid';

if (process.env.BROWSER) {
    require('./SearchForm.less');
}

import IconButton from 'react-mdl/lib/IconButton';
import Icon       from 'react-mdl/lib/Icon';
import Textfield  from 'react-mdl/lib/Textfield';

const ENTER_KEY = 13;

export default class SearchForm extends Component {
    static contextTypes = {i18n: PropTypes.object};

    static propTypes = {
        search: PropTypes.string,
        onSearch: PropTypes.func
    };

    state = {
        isFocused: false
    };

    handleKeyDown = (e) => {
        if (e.keyCode === ENTER_KEY) {
            this.props.onSearch(e.target.value);
        }
    };

    handleSearchChange = (value) => {
        if (!value) {
            this.props.onSearch(value);
        }
    };

    render() {
        const {search, onSearch} = this.props;
        const {l} = this.context.i18n;

        const rootClassNames = cx('SearchForm', {
            'SearchForm--focused': this.state.isFocused
        });

        return (
            <form name="form" id="form">
                <div className={rootClassNames}>
                    <Grid>
                        <Cell
                            align='top'
                            col={9}
                            tablet={8}
                            phone={12}
                        >
                            <div
                                className='SearchForm__box'
                                onClick={() => this.refs.input.focus()}>
                                <input
                                    className='SearchForm__input'
                                    type='text'
                                    ref='input'
                                    placeholder='Address, City, Zip, #MLS'
                                    defaultValue={search}
                                    onChange={(e) => this.handleSearchChange(e.target.value)}
                                    onKeyDown={this.handleKeyDown}
                                    onFocus={ () => this.setState( { isFocused: true } ) }
                                    onBlur={ () => this.setState( { isFocused: false } ) }
                                />
                            </div>
                        </Cell>
                        <Cell col={3}
                              tablet={3}
                              phone={12}>
                            <Button className="SearchForm__search-btn"
                                    type="submit"
                                    raised accent ripple>
                                <Icon name='search' className='SearchForm__search-icon'/>
                                Search
                            </Button>
                        </Cell>
                    </Grid>
                </div>
            </form>
        );
    }
}
