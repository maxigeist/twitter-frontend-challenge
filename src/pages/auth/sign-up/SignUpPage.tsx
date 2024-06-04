import type {ChangeEvent} from "react";
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
    const [data, setData] = useState<Partial<SignUpData>>({});
    const [error, setError] = useState(false);

    const httpRequestService = useHttpRequestService();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleChange =
        (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
            setData({...data, [prop]: event.target.value});
        };
    const handleSubmit = async () => {
        const {confirmPassword, ...requestData} = data;
        try {
            await httpRequestService.signUp(requestData)
            navigate('/')
        } catch (error: any) {
            if (error.response.status === 409) {
                alert('A user with this credentials already exists')
                setError(true)
                setData({})
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
                    <Formik initialValues={{name:'', username:'', email:'', password:''}} onSubmit={}>

                        <div className={"input-container"}>
                            <LabeledInput
                                name='name'
                                required
                                placeholder={"Enter name..."}
                                title={t("input-params.name")}
                                error={error}
                                onChange={handleChange("name")}
                                value={values.name}

                            />
                            <LabeledInput
                                name='username'
                                required
                                placeholder={"Enter username..."}
                                title={t("input-params.username")}
                                error={error}
                                onChange={handleChange("username")}
                            />
                            <LabeledInput
                                name='email'
                                required
                                placeholder={"Enter email..."}
                                title={t("input-params.email")}
                                error={error}
                                onChange={handleChange("email")}
                            />
                            <LabeledInput
                                name='password'
                                type="password"
                                required
                                placeholder={"Enter password..."}
                                title={t("input-params.password")}
                                error={error}
                                onChange={handleChange("password")}
                            />
                            <LabeledInput
                                name='confirmPassword'
                                type="password"
                                required
                                placeholder={"Confirm password..."}
                                title={t("input-params.confirm-password")}
                                error={error}
                                onChange={handleChange("confirmPassword")}
                            />
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <Button
                                text={t("buttons.register")}
                                buttonType={ButtonType.FOLLOW}
                                size={"MEDIUM"}
                                onClick={handleSubmit}
                            />
                            <Button
                                text={t("buttons.login")}
                                buttonType={ButtonType.OUTLINED}
                                size={"MEDIUM"}
                                onClick={() => navigate("/sign-in")}
                            />
                        </div>
                    </Formik>
                </div>
            </div>
        </AuthWrapper>
    )
        ;
};

export default SignUpPage;
