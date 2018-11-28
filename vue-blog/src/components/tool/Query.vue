<template>
  <div class="query">
    <el-card>
      <p class="header">条件查询</p>
      <el-form ref="queryform" label-width="80px">
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="文章标题">
            <el-input v-full size="small" v-model.trim="query.title"></el-input>
          </el-form-item>
        </el-col>
        <el-form-item label="发表日期">
          <el-col :md="5" :sm="24" :xs="24">
            <el-date-picker size="small" type="date" v-full v-model.trim="query.beginDate"  placeholder="选择日期"></el-date-picker> 
          </el-col>
          <el-col :md="1" v-center>-</el-col>
          <el-col :md="5" :sm="24" :xs="24">
            <el-date-picker size="small" type="date" v-full v-model.trim="query.endDate" placeholder="选择日期"></el-date-picker> 
          </el-col>
        </el-form-item>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="作者">
            <el-input v-full size="small" v-model.trim="query.author"></el-input>
          </el-form-item>
        </el-col>        
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="标签">
            <el-select  v-full v-model.trim="query.tags" filterable size="small" placeholder="请选择文章标签">
              <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-center style="padding-top:10px;">
          <el-button size="small" type="primary" @click="submit">查询</el-button>
          <el-button size="small" plain @click="clear">重置</el-button>
        </el-col>
      </el-form>
    </el-card>
    <el-card>
      <p class="header">查询结果</p>
      <div v-for="(item, index) in resList" :key="index">{{ item.title }}</div>
    </el-card>
  </div>
</template>
<script>
import http from "@/api"
export default {
  data(){
    return {
      resList: [],
      query: {},
      options5: [{
          value: 'HTML',
          label: 'HTML'
        }, {
          value: 'CSS',
          label: 'CSS'
        }, {
          value: 'JavaScript',
          label: 'JavaScript'
        }],
    }
  },
  methods: {
    submit(){
      http.queryByCondition(JSON.stringify(this.query))
        .then(({data}) => {
          this.resList = data
        })
    },
    clear(){
      this.$refs.queryform.resetFields()
    }
  }
}
</script>
<style lang="scss">
.query {
  .header {
    color: #afb7ba; font-size: 14px; padding: 10px 0; }
  .el-form-item { margin-bottom: 0; }
  .el-card__body { overflow: hidden;  padding-top: 0; }
}
</style>
