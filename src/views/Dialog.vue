<template>
    <el-dialog v-model="show" :title="option?.type" width="500" :before-close="handleClose" @close="initForm">
        <div class="form-body">
            <el-form :disabled="disabled" ref="ruleFormRef" :model="form" label-width="auto" :rules="rules">
                <el-form-item label="书名" prop="name">
                    <el-input v-model="form.name" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="作者" prop="author">
                    <el-input v-model="form.author" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input type="textarea" v-model="form.description" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="封面" prop="cover">
                    <!-- <el-input v-model="form.cover" placeholder="请输入" /> -->
                    <UploadImg v-model="form.cover" />
                </el-form-item>
            </el-form>

        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="show = false">取消</el-button>
                <el-button v-if="!disabled" type="primary" @click="confimForm">确认</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { DialogType } from '@/view.d.ts';
import { computed, ref, watch } from 'vue';
import { createBook, findBook, updateBook, type CreateBookType } from '@/api';
import UploadImg from './UploadImg.vue';
defineOptions({
    name: 'BookDialog'
})
export type DialogOptionType = {
    id?: number
    type: DialogType
}
const emit = defineEmits(['finish'])
const show = defineModel({ default: false })
const option = defineModel<DialogOptionType, keyof DialogOptionType>('option')
const ruleFormRef = ref<FormInstance>()
const form = ref<CreateBookType>({
    name: '',
    author: '',
    description: '',
    cover: ''
})
const disabled = computed(() => {
    return option.value?.type === DialogType.Detail
})

watch(() => show.value, (val) => {
    if (val && option.value?.id != null) {
        findOne(option.value?.id as number)
    }
}, { immediate: true })

const findOne = async (id: number) => {
    const res = await findBook(id)
    if (res) {
        form.value.author = res.author
        form.value.description = res.description
        form.value.cover = res.cover
        form.value.name = res.name
    }

}

const rules = ref<FormRules<CreateBookType>>({
    name: [{ required: true, message: '书名必填' }],
    author: [{ required: true, message: '作者必填' }],
    description: [{ required: true, message: '描述必填' }],
    cover: [{ required: true, message: '封面必填' }]
})

const initForm = () => {
    form.value.author = ''
    form.value.description = ''
    form.value.cover = ''
    form.value.name = ''
    ruleFormRef.value?.resetFields()
}



const handleClose = (done: () => void) => {
    ElMessageBox.confirm('确认要关闭弹窗吗？')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}

const confimForm = async () => {

    if (!ruleFormRef.value) return
    await ruleFormRef.value.validate(async (valid, fields) => {
        if (!valid) return;
        // send form data   to server
        if (option.value?.type === DialogType.EDIT) {
            await updateBook({ ...form.value, id: option.value?.id as number })
        } else {
            await createBook(form.value)
        }
        show.value = false
        emit('finish');
    })
}
</script>