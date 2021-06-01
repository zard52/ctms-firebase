import React, { Component } from 'react'
import RemoveRedEye from '@material-ui/icons/RemoveRedEye'
import RemoveRedEyeOutlined from '@material-ui/icons/RemoveRedEyeOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { TextField as MaterialTextField, IconButton } from '@material-ui/core'
import { Button } from '../common'
import { PATHS } from '../../constants';

const TextField = (props) => {
    const textFieldStyles = makeStyles({
        input: { height: 20, fontSize: 14, padding: "7px 11px" },
        label: { fontSize: 14, transform: "translate(14px, 10px) scale(1)" }
    })

    const classes = textFieldStyles()
    return <MaterialTextField
        InputProps={{ classes: { input: classes.input } }}
        InputLabelProps={{ classes: { outlined: classes.label } }}
        {...props}
    />
}

const styles = {
    buttonOuterContainer: {
        position: 'absolute',
        left: 48,
        right: 48,
        bottom: 36
    },
    buttonInnerContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    nameContainer: {
        display: 'flex',
        margin: '15px 0px'
    },
    emailContainer: {
        margin: '15px 0px'
    },
    passwordContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '15px 0px'
    }
}

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: {
                value: null,
                error: null
            },
            middleName: {
                value: null,
                error: null
            },
            lastName: {
                value: null,
                error: null
            },
            suffix: {
                value: null,
                error: null
            },
            phone: {
                value: null,
                error: null
            },
            email: {
                value: null,
                error: null
            },
            password: {
                value: null,
                error: null,
                confirm: null,
                show: false
            }
        };
    }
    render() {

        const { firstName, middleName, lastName, suffix, phone, email, password } = this.state;
        return (
            <div>
                {/* <!-- Variables --> */}
                <h2>Account</h2>
                <div style={styles.nameContainer}>
                    <TextField
                        fullWidth
                        style={{ marginRight: 16 }}
                        variant='outlined'
                        label='First Name'
                        error={firstName.error}
                        onChange={(event) => this.setState({ firstName: { value: event.target.value, error: null } })}
                    />
                </div>
                <div style={styles.nameContainer}>
                    <TextField
                        fullWidth
                        style={{ marginRight: 16 }}
                        variant='outlined'
                        label='Middle Name'
                        error={middleName.error}
                        onChange={(event) => this.setState({ middleName: { value: event.target.value, error: null } })}
                    />
                </div>
                <div style={styles.nameContainer}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Last Name'
                        error={lastName.error}
                        onChange={(event) => this.setState({ lastName: { value: event.target.value, error: null } })}
                    />
                </div>
                <div style={styles.nameContainer}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Suffix'
                        error={suffix.error}
                        onChange={(event) => this.setState({ suffix: { value: event.target.value, error: null } })}
                    />
                </div>
                <div style={styles.nameContainer}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Phone Number'
                        error={phone.error}
                        onChange={(event) => this.setState({ phone: { value: event.target.value, error: null } })}
                    />
                </div>
                <div style={styles.emailContainer}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Email'
                        error={email.error}
                        onChange={(event) => this.setState({ email: { value: event.target.value, error: null } })}
                    />
                </div>
                <div style={styles.passwordContainer}>
                    <TextField
                        fullWidth
                        style={{ marginRight: 16 }}
                        variant='outlined'
                        label='Password'
                        type={password.show ? 'string' : 'password'}
                        onChange={(event) => this.setState({ password: { ...password, value: event.target.value, error: null } })}
                    />
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Confirm'
                        type={password.show ? 'string' : 'password'}
                        onChange={(event) => this.setState({ password: { ...password, confirm: event.target.value, error: null } })}
                    />
                    <IconButton
                        style={{ padding: 6, margin: '0px 6px' }}
                        onClick={() => this.setState({ password: { ...password, show: !password.show } })}
                    >
                        {
                            password.show ?
                                <RemoveRedEye />
                                : <RemoveRedEyeOutlined />
                        }
                    </IconButton>
                </div>
                <div style={styles.buttonOuterContainer}>
                    <div style={styles.buttonInnerContainer}>
                        <Button
                            color='primary'
                            onClick={() => this.props.history.push(PATHS.login)}
                        >
                            Sign in instead
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => this.register()}
                        >
                            Next
                    </Button>
                    </div>
                </div>
                {/* <!-- Functions --> */}
                <div>
                    {/* <!-- Functions --> */}
                    <p><button onClick={this.props.previousStep}>Previous Step</button></p>
                    <p><button onClick={this.props.nextStep}>Next Step</button></p>
                </div>
            </div>
        )
    }
}