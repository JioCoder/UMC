import React, { useContext } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // AuthContext 가져오기

const schema = yup.object().shape({
    email: yup.string().email('올바른 이메일 형식이 아닙니다. 다시 확인해주세요!').required('이메일을 입력해주세요.'),
    password: yup.string()
        .min(8, '비밀번호는 8자 이상이어야 합니다.')
        .max(16, '비밀번호는 16자 이하여야 합니다.')
        .required('비밀번호를 입력해주세요.'),
});

const LoginPage = () => {
    const { handleLogin } = useContext(AuthContext); // AuthContext에서 handleLogin 가져오기
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', data);
            const { accessToken, refreshToken } = response.data;

            // 사용자 정보와 토큰을 localStorage에 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            const userData = { email: data.email };

            handleLogin(userData); // 로그인 후 AuthContext에 로그인 상태 저장
            navigate('/'); // 로그인 후 홈 페이지로 이동
        } catch (error) {
            console.error("로그인 실패:", error);
            alert("로그인에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <Wrapper>
            <Heading>로그인</Heading>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <FieldLabel>이메일</FieldLabel>
                <InputField
                    type="email"
                    {...register("email")}
                    placeholder="이메일을 입력해주세요!"
                    isError={errors.email}
                />
                {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

                <FieldLabel>비밀번호</FieldLabel>
                <InputField
                    type="password"
                    {...register("password")}
                    placeholder="비밀번호를 입력해주세요!"
                    isError={errors.password}
                />
                {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

                <SubmitButton disabled={!isValid}>로그인</SubmitButton>
            </FormContainer>
        </Wrapper>
    );
};

export default LoginPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    color: white;
`;

const Heading = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 320px;
`;

const FieldLabel = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
`;

const InputField = styled.input`
    padding: 12px;
    margin-bottom: 12px;
    font-size: 15px;
    border: 1px solid ${props => props.isError ? '#ff0558' : '#ccc'};
    border-radius: 5px;
    outline: none;

    &:focus {
        border: 1px solid blue;
    }
`;

const ErrorText = styled.div`
    color: #ff0558;
    font-size: 13px;
    margin-bottom: 12px;
`;

const SubmitButton = styled.button`
    padding: 10px;
    font-size: 16px;
    background-color: ${(props) => (props.disabled ? '#ccc' : '#ff0558')};
    color: white;
    border: none;
    border-radius: 5px;
    margin-top: 12px;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;
