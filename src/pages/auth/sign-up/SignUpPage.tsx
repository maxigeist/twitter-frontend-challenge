import React, {useState} from "react";
import logo from "../../../assets/logo.png";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import AuthWrapper from "../../../pages/auth/AuthWrapper";
import {useHttpRequestService} from "../../../service/HttpRequestService";
import LabeledInput from "../../../components/labeled-input/LabeledInput";
import Button from "../../../components/button/Button";
import {ButtonType} from "../../../components/button/StyledButton";
import {StyledH3} from "../../../components/common/text";
import {Formik} from "formik";

interface SignUpData {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUpPage = () => {
    const [error, setError] = useState('');
    const httpRequestService = useHttpRequestService();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleSubmitSignUp = async (data: SignUpData) => {
        const {confirmPassword, ...requestData} = data
        console.log('hola')
        try {
            await httpRequestService.signUp(requestData)
            navigate('/')
        } catch (error: any) {
            if (error.response.status === 409) {
                setError('A user with this credentials already exists')
            }
        }
    };


    return (
        <AuthWrapper>
            <div className={"border"}>
                <div className={"container"}>
                    <div className={"header"}>
                        <img src={logo} alt="Twitter Logo"/>
                        <StyledH3>{t("title.register")}</StyledH3>
                    </div>
                    <Formik initialValues={{name: '', username: '', email: '', password: '', confirmPassword: ''}}
                            validate={(values) => {
                                const errors: { password?: string, email?: string } = {};
                                if (values.password !== values.confirmPassword) {
                                    errors.password = 'Passwords do not match'
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                else if(values.password.length < 8 && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/.test(values.password) ) {
                                    errors.password = 'The password is not strong enough'
                                }
                                return errors;
                            }}
                            onSubmit={(values, {setSubmitting}) => {
                                handleSubmitSignUp(values).then((res) => console.log(res))
                                setSubmitting(false)
                            }}>
                        {({
                              values,
                              handleChange,
                              handleSubmit,
                              errors,
                              touched,
                              isSubmitting
                          }) => (
                            <form onSubmit={handleSubmit}>
                                <div className={"input-container"}>
                                    <LabeledInput
                                        name='name'
                                        required
                                        placeholder={"Enter name..."}
                                        title={t("input-params.name")}
                                        onChange={handleChange}
                                        value={values.name}
                                    />
                                    <p></p>
                                    <LabeledInput
                                        name='username'
                                        required
                                        placeholder={"Enter username..."}
                                        title={t("input-params.username")}
                                        error={!!error}
                                        onChange={handleChange}
                                        value={values.username}
                                    />
                                    <p></p>
                                    <LabeledInput
                                        name='email'
                                        required
                                        placeholder={"Enter email..."}
                                        title={t("input-params.email")}
                                        error={(touched.email && !!errors.email) || !!error}
                                        onChange={handleChange}
                                        value={values.email}
                                    />
                                    <p className={'error-message'}>{touched.email && errors.email}
                                    </p>
                                    <LabeledInput
                                        name='password'
                                        type="password"
                                        required
                                        placeholder={"Enter password..."}
                                        title={t("input-params.password")}
                                        error={touched.password && !!errors.password}
                                        onChange={handleChange}
                                        value={values.password}
                                    />
                                    <p className={'error-message'}>{errors.password && touched.password}
                                    </p>
                                    <LabeledInput
                                        name='confirmPassword'
                                        type="password"
                                        required
                                        placeholder={"Confirm password..."}
                                        title={t("input-params.confirm-password")}
                                        error={touched.password && !!errors.password}
                                        onChange={handleChange}
                                        value={values.confirmPassword}
                                    />
                                    <p className={'error-message'}>{errors.password && touched.password}
                                    </p>
                                </div>
                                <div style={{
                                    display: "flex", flexDirection: "column", alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Button
                                        type='submit'
                                        text={t("buttons.register")}
                                        buttonType={ButtonType.FOLLOW}
                                        size={"MEDIUM"}
                                        disabled={isSubmitting}
                                    />
                                    <Button
                                        text={t("buttons.login")}
                                        buttonType={ButtonType.OUTLINED}
                                        size={"MEDIUM"}
                                        onClick={() => navigate("/sign-in")}
                                    />
                                    <p className={'error-message'}>{error}
                                    </p>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </AuthWrapper>
    )
        ;
};

export default SignUpPage;
