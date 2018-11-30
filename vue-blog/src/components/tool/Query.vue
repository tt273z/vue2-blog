<template>
  <div class="query">
    <el-card>
      <p class="header">条件查询</p>
      <el-form :model="query" label-width="80px">
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="文章标题" prop="title">
            <el-input v-full size="medium" v-model.trim="query.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="文章作者" prop="author">
            <el-input v-full size="medium" v-model.trim="query.author"></el-input>
          </el-form-item>
        </el-col>        
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="文章标签" prop="tags">
            <!-- <el-select  v-full v-model.trim="query.tags" filterable size="medium" placeholder="请选择文章标签">
              <el-option v-for="item in tags" :key="item" :label="item" :value="item">
              </el-option>
            </el-select> -->
            <el-autocomplete v-full size="medium" v-model.trim="query.tags" :fetch-suggestions="searchTags" placeholder="请输入标签" 
              :trigger-on-focus="false" @select="handleSelect">
              <template slot-scope="tags">
                <p>{{tags.item}}</p>
              </template>
            </el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="发表日期" prop="beginDate">
            <el-col :md="11" :sm="24" :xs="24">
              <el-date-picker size="medium" type="date" v-full v-model.trim="query.beginDate"  placeholder="选择日期"></el-date-picker> 
            </el-col>
            <el-col :md="2" v-center>-</el-col>
            <el-col :md="11" :sm="24" :xs="24">
              <el-date-picker size="medium" type="date" v-full v-model.trim="query.endDate" placeholder="选择日期"></el-date-picker> 
            </el-col>
          </el-form-item>               
        </el-col>
        <el-col :span="24" v-center style="padding-top:10px;">
          <el-button size="medium" type="primary" @click="submit()">查询</el-button>
          <el-button size="medium" plain @click="clear()">重置</el-button>
        </el-col>
      </el-form>
    </el-card>
    <el-card style="margin-top:5px;">
      <p class="header">查询结果</p>
      <el-table :data="resList" v-full v-loading="loading" :default-sort = "{prop: 'pv', order: 'descending'}">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column prop="time" label="发表时间"></el-table-column>
        <el-table-column prop="tags" label="标签" :formatter="tagsFormatter"></el-table-column>
        <el-table-column prop="pv" label="pv" sortable></el-table-column>
        <el-table-column prop="comments" label="评论数" :formatter="comFormatter" sortable></el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template slot-scope="list">
            <!-- <i class="el-icon-view"></i> -->
            <el-button  @click="showDetail(list.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import http from "@/api"
class QueryModel {
  constructor(title, author, tags, beginDate, endDate){
    this.title = title
    this.author = author
    this.tags = tags
    this.beginDate = beginDate
    this.endDate = endDate
  }

}
export default {
  data(){
    return {
      resList: [],
      query: new QueryModel(),
      tags: [],
      loading: true
    }
  },
  mounted(){
    this.getTags()
    this.submit()
  },
  methods: {
    submit(){
      this.loading = true
      http.queryByCondition({ json: JSON.stringify(this.query) })
        .then(({data}) => {
          this.resList = data
          this.loading = false
        })
    },
    clear(){
      this.query = new QueryModel()
    },
    pushDetail(row){
      this.$router.push({ name: 'postid', params: { id: row._id } })
    },
    tagsFormatter(row){
      return row.tags.join(' / ')
    },
    comFormatter(row){
      return row.comments.length
    },
    getTags(){
      http.getAllTags()
        .then(({data}) => {
          this.tags = data
        })
    },
    searchTags(str, cb){
      var result = str ? this.tags.filter(e => e.toLowerCase().indexOf(str.toLowerCase()) != -1 ) : this.tags;
      cb(result)
    },
    handleSelect(item){
      this.query.tags = item
    },
    
  }
}
</script>
<style lang="scss">
.query {
  .header { color: #afb7ba; font-size: 14px; padding: 10px 0; }
  .el-form-item { margin-bottom: 5px; }
  .el-card__body { overflow: hidden;  padding-top: 0; }
  .el-autocomplete-suggestion__wrap { padding: 5px 0; }
}
</style>
