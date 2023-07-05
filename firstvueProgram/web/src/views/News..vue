<template>
    <div class="container">
        <div class="news-header" :style="{backgroundImage:`url(${require('../assets/newsbg.jpg')})`}"></div>
        <div class="search">
            <el-popover
                placement="bottom"
                title="检索结果"
                width="50%"
                :visible="visible"
                
            >
                <template #reference>
                    <el-input
                v-model="searchText"
                class="w-50 m-2"
                placeholder="请输入新闻关键字"
                :prefix-icon="Search"
                type="search"
                size="large"
                @input="visible=true"
                @blur="visible=false"
            />
                </template>
                <div v-if="searchnewslist.length">
                    <div v-for="data in searchnewslist" :key="data._id" class="search-item" @click="handleChangepage(data._id)">
                    {{ data.title }}
                    </div>
                </div>
                <div v-else>
                    <el-empty description="暂无新闻" :image-size="50" />
                </div>

            </el-popover>
        </div>
        <div class="topnews">
            <el-row :gutter="20">
                <el-col :span="6"
                v-for="item in topNewsList"
                :key="item._id"
                @click="handleChangepage(item._id)"
                >
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                    <div class="image" :style="{backgroundImage:`url(http://localhost:3000${item.cover})`}">
                        </div>
                    <div style="padding: 14px">
                        <span>{{item.title}}</span>
                        <div class="bottom">
                        <time class="time">{{ whichTime(item.editTime)}}</time>
                    </div>
                    </div>
                </el-card>
                </el-col>
            </el-row>
        </div>
        
                <el-tabs v-model="whichTab" class="demo-tabs"  style="margin: 20px;">
                    <el-tab-pane 
                        :key="item.name" 
                        v-for="item in tablist" 
                        :label="item.label" 
                        :name="item.name" 
                       >

                        <el-row :gutter="20">
                          <el-col :span="18">
                        <div v-for="data in tabnews[item.name]" :key="data._id" style="padding:10px" @click="handleChangepage(data._id)">
                            <el-card :body-style="{ padding: '0px' }" shadow="hover">
                                <div class="tab-image" :style="{backgroundImage:`url(http://localhost:3000${data.cover})`}"></div>
                                <div style="padding: 14px;float:left">
                                    <span>{{data.title}}</span>
                                    <div class="bottom">
                                    <time class="time">{{ whichTime(data.editTime)}}</time>
                                </div>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                        <el-col :span="6">
                            <el-timeline>
                                <el-timeline-item
                                v-for="(data, index) in tabnews[item.name]"
                                :key="index"
                                :timestamp="whichTime(data.editTime)"
                                >
                                {{ data.title }}
                                </el-timeline-item>
                            </el-timeline>
                        </el-col>
                    </el-row> 
                </el-tab-pane>
                </el-tabs>

            </div>


        </template>

<script setup>
      import { Search } from '@element-plus/icons-vue'
      import {ref, onMounted,computed} from 'vue'
      import { useRouter } from 'vue-router'
      import axios from 'axios'
      import moment from 'moment'
      import _ from 'lodash'

    const router= useRouter()

    const whichTab = ref(1)

    const tablist = [
        {
            label:"最新动态",
            name:1,
        },{
            label:"经典案例",
            name:2,
        },{
            label:"通知公告",
            name:3,
        }
    ]



      moment.locale("zh-cn")

      const searchText = ref("")
      const visible = ref(false)
      const newlist = ref([])
      onMounted(async ()=>{
        var res = await axios.get("/webapi/news/list")
        // console.log(res.data)
        newlist.value = res.data.data
        // console.log(_.groupBy(newlist.value,item=>item.category))
      })
           
      const searchnewslist = computed(()=>searchText.value?newlist.value.filter(item=>item.title.includes(searchText.value)):[])
      const topNewsList = computed(()=>newlist.value.slice(0,4))
      const whichTime = time=>{
        return moment(time).format("lll")
      }

     const tabnews = computed(()=>_.groupBy(newlist.value,item=>item.category))
    // console.log(tabnews)

    const handleChangepage =(id)=>{
        router.push(`/news/${id}`)
    }

</script>

<style scoped lang="scss">
.container {
    position: relative;
}

.news-header {
    position: relative;
    width: 100%;
    height: 400px;
    background-size: cover;
}

.search {
    position: absolute;
    top: 200px;
    width: 100%;
    text-align: center;
    .el-input {
        width: 50%;
    }
}

.search-item{
    height: 50px;
    line-height: 50px;
    &:hover{
        background: whitesmoke;
        color:red
    }
}

.topnews{
    margin: 20px;
    .el-card {
        box-shadow: 2px 2px 2px ;
    }
    .image {
        width: 100%;
        height: 150px;
        background-size: cover;
    }

    .time{
        font-size: 15px;
        color: gray;
    }
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.image {
  width: 100%;
  display: block;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.tab-image {
        width: 150px;
        height: 100px;
        background-size: cover;
        float: left;
}
</style>