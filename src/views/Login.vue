<script setup lang="ts">
import { ref } from 'vue';
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { login, type LoginFormType } from '@/api';
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/counter';
defineOptions({
    name: 'login-comp'
})
const router = useRouter()
const formRef = ref<FormInstance>()
const store = useUserStore()

const loginForm = ref<LoginFormType>({
    username: '',
    password: '',
})
const rules = ref<FormRules<loginForm>>({
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' }
    ],
})


const onSubmit = async () => {
    if (!formRef.value) return
    await formRef.value.validate(async (valid) => {
        if (valid) {
            await login(loginForm.value)
            store.setUserId('logined')
            // 登陆成功跳转到首页
            router.replace('/')
        }
    })
}

</script>

<template>
    <div class="login">
        <h1>图书管理系统</h1>
        <div>
            <el-form ref="formRef" :model="loginForm" label-width="auto" size="large" :rules="rules">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="用户名" />
                </el-form-item>

                <el-form-item prop="password">
                    <el-input type="password" show-password v-model="loginForm.password" placeholder="密码" />
                </el-form-item>

                <div class="to-page">
                    <el-text>没有账号？<el-link href="/register">去注册</el-link></el-text>
                </div>

                <el-form-item>
                    <el-button style="width: 100%;" type="primary" @click="onSubmit">登 录</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login {
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