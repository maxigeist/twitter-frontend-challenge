import React, {useEffect, useState} from "react";
import logo from "../../../assets/logo.png";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useHttpRequestService} from "../../../service/HttpRequestService";
import AuthWrapper from "../AuthWrapper";
import LabeledInput from "../../../components/labeled-input/LabeledInput";
import Button from "../../../components/button/Button";
import {ButtonType} from "../../../components/button/StyledButton";
import {StyledH3} from "../../../components/common/text";
import {Formik} from "formik";
import Input from "../../../components/styled-input/Input";
import {InputContainerSize} from "../../../components/styled-input/InputContainer";
import {useAppDispatch} from "../../../redux/hooks";
import {updateToastData} from "../../../redux/toast";
import {ToastType} from "../../../components/toast/Toast";

const SignInPage = () => {
    const [error, setError] = useState(false);

    const httpRequestService = useHttpRequestService();
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const {t} = useTranslation();

    useEffect(() => {

    }, [error]);

    return (
        <AuthWrapper>
            <div className={"border"}>
                <div className={"container"}>
                    <div className={"header"}>
                        <img src={logo} alt={"Twitter Logo"}/>
                        <StyledH3>{t("title.login")}</StyledH3>
                    </div>

                    <Formik initialValues={{email: '', password: ''}}
                            onSubmit={(values, {setSubmitting}) => {
                                httpRequestService
                                    .signIn(values)
                                    .then(() => navigate("/"))
                                    .catch(() => {
                                        dispatch(updateToastData({message: 'You were not able to sign in',type: ToastType.ALERT}))
                                        setError(true)
                                    });
                                setSubmitting(false);
                            }}>
                        {({
                              values,
                              handleChange,
                              handleSubmit,
                              isSubmitting,
                          }) => (
                            <form onSubmit={handleSubmit}>
                                <div className={"input-container"}>
                                    <Input
                                        name={'email'}
                                        sizing={InputContainerSize.LARGE}
                                        title={t("input-params.email")}
                                        placeholder={"Enter email..."}
                                        required
                                        error={error}
                                        onChange={handleChange}
                                        value={values.email}/>
                                    <LabeledInput
                                        name="password"
                                        type="password"
                                        required
                                        placeholder={"Enter password..."}
                                        title={t("input-params.password")}
                                        error={error}
                                        onChange={handleChange}
                                        value={values.password}
                                    />
                                </div>
                                <div style={{
                                    display: "flex",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    marginTop: 6
                                }}>
                                    <Button
                                        type="submit"
                                        text={t("buttons.login")}
                                        buttonType={ButtonType.FOLLOW}
                                        size={"MEDIUM"}
                                        disabled={isSubmitting}
                                    />
                                    <Button
                                        text={t("buttons.register")}
                                        buttonType={ButtonType.OUTLINED}
                                        size={"MEDIUM"}
                                        onClick={() => navigate("/sign-up")}
                                    />
                                </div>
                            </form>
                        )}
                    </Formik>
                    <p className={"error-message"}>{error && t("error.login")}</p>

                </div>
            </div>
        </AuthWrapper>
    );
};

export default SignInPage;
