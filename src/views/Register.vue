<script setup lang="ts">
import { ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { register, type LoginFormType } from '@/api';
import { useRouter } from 'vue-router'
type FormType = LoginFormType & { password2: string };
defineOptions({
    name: 'login-comp'
})
const router = useRouter()
const formRef = ref<FormInstance>()

const loginForm = ref<FormType>({
    username: '',
    password: '',
    password2: '',
})
const rules = ref<FormRules<FormType>>({
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },

    ],
    password2: [
        {
            required: true, message: '请再次输入您的密码', trigger: 'blur'
        },
        {
            validator: (rule, value, callback) => {
                if (value !== loginForm.value.password) {
                    callback(new Error('两次输入的密码不一致!'));
                } else {
                    callback();
                }
            }, trigger: 'blur'
        },
    ]
})


const onSubmit = async () => {
    if (!formRef.value) return
    await formRef.value.validate(async (valid) => {
        if (valid) {
            const { username, password } = loginForm.value
            await register({ username, password })
            // 注册成功跳转到登录页
            router.replace('/login')
        }
    })
}

</script>

<template>
    <div class="register">
        <h1>图书管理系统</h1>
        <div>
            <el-form ref="formRef" :model="loginForm" label-width="auto" size="large" :rules="rules">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="用户名" />
                </el-form-item>

                <el-form-item prop="password">
                    <el-input type="password" show-password v-model="loginForm.password" placeholder="密码" />
                </el-form-item>

                <el-form-item prop="password2">
                    <el-input type="password" show-password v-model="loginForm.password2" placeholder="确认密码" />
                </el-form-item>
                <div class="to-page">
                    <el-text>已有账号？<el-link href="/login">去登录</el-link></el-text>
                </div>

                <el-form-item>
                    <el-button style="width: 100%;" type="primary" @click="onSubmit">注 册</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.register {
    width: 450px;
    margin: 100px auto;

    h1 {
        text-align: center;
        margin-bottom: 50px;
        font-weight: 600;
    }

    .to-page {
        text-align: right;
        margin-top: 20px;
        margin-bottom: 20px;
        margin-right: 10px;

        a {
            color: #409eff;
        }
    }
}
</style>