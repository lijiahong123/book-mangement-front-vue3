<script setup lang="ts">
import { uploadCover } from '@/api';
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadRequestOptions } from 'element-plus';
import { computed } from 'vue';
const url = defineModel<string>()

const coverPath = computed(() => {
    const covre = url.value
    if (covre && covre.startsWith('/upload')) {
        return 'http://127.0.0.1:3001' + covre
    }
    return covre
})

const uploadFile = async (options: UploadRequestOptions) => {
    const file = options.file
    const formData = new FormData()
    formData.append('file', file)
    const coverUrl = await uploadCover(formData)
    url.value = coverUrl
}

</script>

<template>
    <data class="upload-box">
        <div class="cover-box" v-if="coverPath">
            <img :src="coverPath" alt="">
        </div>
        <div>
            <el-upload class="upload-demo" drag :http-request="uploadFile" accept=".png, .jpg, .jpeg, .gif">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    拖拽文件到这里或者 <em>点击上传</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        请上传.png, .jpg, .jpeg, .gif后缀的图片
                    </div>
                </template>
            </el-upload>
        </div>
    </data>
</template>

<style lang="scss" scoped>
.upload-box {
    width: 100%;

    .cover-box {
        width: 50%;

        img {
            width: 100%;
        }
    }

    .el-upload {
        width: 100%;
    }

}
</style>