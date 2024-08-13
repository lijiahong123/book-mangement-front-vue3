<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { delBook, pageList, type BookType } from '@/api/index.ts'
import { ElMessage } from 'element-plus'
import { DialogType } from '@/view.d.ts'
import BookDialog from './Dialog.vue'
import type { DialogOptionType } from './Dialog.vue'
export type QueryType = { name?: string }




const queryForm = ref<QueryType>({ name: '' })
const bookList = ref<BookType[]>([])
const showDialog = ref<boolean>(false)

const dialogOption = ref<DialogOptionType>({
  type: DialogType.ADD
})

onMounted(() => {
  getPageList()
})

const getPageList = async () => {
  const res = await pageList(queryForm.value)
  bookList.value = res
}

const optionDialog = (type: DialogType, id?: number) => {
  showDialog.value = true;
  if (id == null) {
    delete dialogOption.value.id
  } else {
    dialogOption.value.id = id
  }
  dialogOption.value.type = type
}

const delBookCard = async (id: number) => {
  const res = await delBook(id)
  if (res === true) {
    ElMessage.success({
      message: '已删除'
    })
    getPageList()
  }

}

function getCover(cover: string) {
  if (cover && cover.startsWith('/upload')) {
    return 'http://127.0.0.1:3001' + cover
  }
  return cover
}

</script>

<template>
  <div class="search-container">
    <el-form :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item label="">
        <el-input style="width: 30vw;" v-model="queryForm.name" placeholder="请输入书名" clearable />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getPageList">搜索</el-button>
        <el-button type="info" @click="optionDialog(DialogType.ADD)">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="book-list">
    <el-space wrap>
      <el-card v-for="item in bookList" :key="item.id">
        <div class="book-cover">
          <img :src="getCover(item.cover)" alt="">
        </div>
        <h2 class="book-name">{{ item.name }}</h2>
        <div class="book-author ellipsis">{{ item.author }}</div>
        <div class="book-description ellipsis2">{{ item.description }}</div>

        <div class="book-bths">
          <el-button type="primary" link @click="optionDialog(DialogType.Detail, item.id)">详情</el-button>
          <el-button type="success" link @click="optionDialog(DialogType.EDIT, item.id)">编辑</el-button>
          <el-button type="danger" link @click="delBookCard(item.id)">删除</el-button>
        </div>
      </el-card>
    </el-space>
  </div>

  <BookDialog v-model="showDialog" :option="dialogOption" @finish="getPageList" />
</template>


<style lang="scss" scoped>
.book-list {
  .el-card {
    cursor: pointer;
    box-sizing: border-box;
    width: 300px;
    overflow: hidden;
    // margin: 0 20px 20px 0;

    .book-cover {
      margin: -20px;
      margin-bottom: 0;

      img {
        width: 100%;
        height: 350px;
        object-fit: cover;
      }

    }

    .book-author {
      text-align: right;
      color: var(--el-color-primary)
    }

    .book-description {
      height: 48px;
    }

    .book-bths {
      margin-top: 15px;
      display: flex;
      justify-content: end;
    }
  }
}
</style>