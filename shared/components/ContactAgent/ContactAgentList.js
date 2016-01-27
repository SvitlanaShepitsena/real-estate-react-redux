import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
export const fields = ['name', 'email', 'message'];
import {Card, CardText, CardTitle, CardActions} from 'react-mdl/lib/Card';
import Button      from 'react-mdl/lib/Button';
import AgentThumb from './AgentThumb';

if (process.env.BROWSER) {
    require('./ContactAgentList.less');
}
class ContactAgentList extends Component {
    constructor(props) {
        // Running constructor of Parent (React.Component) for binding this to object.
        // Dynamically assigned global property This is always a component itself.
        super(props);
    }

    static propTypes = {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        resetForm: PropTypes.func.isRequired,
        submitting: PropTypes.bool.isRequired
    };

    handleSubmit(e) {
        //e.preventDefault();
        console.log('Your message have been sent');
        //this.props.resetForm();
    }

    render() {
        const {
            fields: {name, email, message},
            resetForm,
            submitting
        } = this.props;
        return (
            <form action="/gmail" method="post">
                <Card shadow={1} className="ContactAgentList__Card">
                    <AgentThumb></AgentThumb>

                    <CardTitle>
                        Send a message
                    </CardTitle>
                    <CardText>

                        <div className="ContactAgentList__input-container">
                            <input className="mdl-textfield__input" type="text" placeholder="Name" {...name}/>
                        </div>

                        <div className="ContactAgentList__input-container">
                            <input className="mdl-textfield__input" type="email" placeholder="Email" {...email}/>
                            {email.touched && email.error &&
                            <span className="ContactAgentList__error">{email.error}</span>}
                        </div>
                        <div className="ContactAgentList__input-container">
                        <textarea className="mdl-textfield__input" placeholder="Message" rows="3" {...message}
                                  value={message.value || ''}/> {message.touched && message.error &&
                        <span className="ContactAgentList__error">{message.error}</span>}
                        </div>
                    </CardText>
                    <CardActions>
                        <Button
                            type="submit"
                            primary ripple
                            disabled={submitting}
                            onClick={this.handleSubmit.bind(this)}>
                            {submitting ? <i/> : <i/>}
                            Submit
                        </Button>
                        <Button ripple
                                disabled={submitting}
                                onClick={resetForm}>
                            Clear
                        </Button>
                    </CardActions>
                </Card>
            </form>
        )
            ;
    }
}

const validate = values => {

    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.message) {
        errors.message = 'Required';
    }

    return errors;
};

export default reduxForm({
    form: 'ContactAgentList',
    fields,
    validate
})(ContactAgentList);