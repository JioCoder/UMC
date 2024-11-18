import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    email: yup.string().email('올바른 이메일 형식이 아닙니다. 다시 확인해주세요!').required('이메일을 입력해주세요.'),
    password: yup.string()
        .min(8, '비밀번호는 8자 이상이어야 합니다.')
        .max(16, '비밀번호는 16자 이하여야 합니다.')
        .required('비밀번호를 입력해주세요.'),
    passwordCheck: yup.string()
        .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
        .required('비밀번호 확인은 필수 입력입니다.'),
});

const SignupPage = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await axios.post('http://localhost:3000/auth/register', data, {
                headers: { 'Content-Type': 'application/json' },
            });

            navigate('/login'); 
        } catch (error) {
            console.error('회원가입 오류:', error);
            alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <Wrapper>
            <Heading>회원가입 페이지</Heading>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <TextLabel>이메일</TextLabel>
                <InputField
                    type="email"
                    {...register("email")}
                    placeholder="이메일을 입력해주세요!"
                    isError={!!errors.email} 
                />
                {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

                <TextLabel>비밀번호</TextLabel>
                <InputField
                    type="password"
                    {...register("password")}
                    placeholder="비밀번호를 입력해주세요!"
                    isError={!!errors.password} 
                />
                {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

                <TextLabel>비밀번호 확인</TextLabel>
                <InputField
                    type="password"
                    {...register("passwordCheck")}
                    placeholder="비밀번호를 다시 입력해주세요!"
                    isError={!!errors.passwordCheck} 
                />
                {errors.passwordCheck && <ErrorText>{errors.passwordCheck.message}</ErrorText>}

                <SubmitButton type="submit" disabled={!isValid}>회원가입</SubmitButton>
            </FormContainer>
        </Wrapper>
    );
};

export default SignupPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    color: white;
`;

const Heading = styled.h2`
    font-size: 26px;
    margin-bottom: 24px;
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 320px;
`;

const TextLabel = styled.label`
    margin-bottom: 6px;
    font-size: 15px;
`;

const InputField = styled.input`
    padding: 12px;
    margin-bottom: 12px;
    font-size: 16px;
    border: 1px solid ${props => props.isError ? '#aaa' : '#3498db'};
    border-radius: 5px;
    outline: none;

    &:focus {
        border: 2px solid blue;
    }
`;

const ErrorText = styled.div`
    color: #ff0558;
    font-size: 13px;
    margin-bottom: 12px;
`;

const SubmitButton = styled.button`
    padding: 12px;
    font-size: 16px;
    background-color: #ff0558;
    color: white;
    border: none;
    border-radius: 5px;
    margin-top: 12px;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

    &:disabled {
        background-color: #aaa;
    }
`;
