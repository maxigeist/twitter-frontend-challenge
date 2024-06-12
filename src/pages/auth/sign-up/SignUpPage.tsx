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
import * as Yup from 'yup';

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
        try {
            await httpRequestService.signUp(requestData)
            navigate('/')
        } catch (error: any) {
            if (error.response.status === 409) {
                setError('A user with this credentials already exists')
            }
        }
    };

    const SignupSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        password: Yup.string()
            .min(8, 'The passwordd should be longer!')
            .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
            .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
            .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
            .matches(/^(?=.*[!@#%&])/, 'Must contain at least one special character')
            .required('Required'),
        username: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match')
    });


    return (
        <AuthWrapper>
            <div className={"border"}>
                <div className={"container"}>
                    <div className={"header"}>
                        <img src={logo} alt="Twitter Logo"/>
                        <StyledH3>{t("title.register")}</StyledH3>
                    </div>
                    <Formik initialValues={{name: '', username: '', email: '', password: '', confirmPassword: ''}}
                            validationSchema={SignupSchema}
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
                                    <LabeledInput
                                        name='username'
                                        required
                                        placeholder={"Enter username..."}
                                        title={t("input-params.username")}
                                        error={!!error}
                                        onChange={handleChange}
                                        value={values.username}
                                    />
                                    <LabeledInput
                                        name='email'
                                        required
                                        placeholder={"Enter email..."}
                                        title={t("input-params.email")}
                                        error={(touched.email && !!errors.email) || !!error}
                                        onChange={handleChange}
                                        value={values.email}
                                    />
                                    {touched.email && <text className={'error-message'}>{errors.email}
                                    </text>}
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
                                    {touched.password && <text className={'error-message'}>{errors.password}
                                    </text>}
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
                                    {touched.password && <text className={'error-message'}>{errors.confirmPassword}
                                    </text>}
                                </div>
                                <div style={{
                                    display: "flex", flexDirection: "column", alignItems: 'center',
                                    justifyContent: 'center', marginTop:'10px'
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
