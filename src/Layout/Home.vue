<script lang="ts" setup>
import { useUserStore } from '@/stores/counter';
import { RouterView, useRouter } from 'vue-router'
defineOptions({
    name: 'LayoutHome'
})
const store = useUserStore()
const router = useRouter()

const logout = () => {
    store.setUserId()
    router.replace('/logout')
}
</script>

<template>
    <div>
        <header>
            <el-row :gutter="24">
                <el-col :span="18" :offset="2">
                    <h1>图书管理系统</h1>
                </el-col>
                <el-col :span="2">
                    <el-icon size="30" @click="logout">
                        <el-tooltip effect="dark" content="退出" placement="bottom">
                            <i-ep-UserFilled />
                        </el-tooltip>
                    </el-icon>
                </el-col>
            </el-row>
        </header>
        <el-divider />
        <main>

            <el-row :gutter="24">
                <el-col :span="20" :offset="2">
                    <RouterView />
                </el-col>
            </el-row>
        </main>
    </div>
</template>

<style lang="scss" scoped>
header {
    height: 60px;
    line-height: 60px;

    h1 {
        font-weight: 700;
    }

    .el-col {
        display: flex;
        align-items: center;
    }
}

.el-row {
    margin: 0 !important;
}
</style>