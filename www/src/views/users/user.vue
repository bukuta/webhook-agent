<template>
  <el-form style="" :model="item">
    <el-form-item label="名字">
      <el-input v-model="item.name" placeholder="输入用户名"/>
    </el-form-item>
    <el-form-item label="登录账号">
      <el-input v-model="item.account" placeholder="输入登录账号"/>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type='password' v-model="item.password" placeholder="输入新密码"/>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data(){
    console.log(this.$attrs.data);
    return {
      key: this.$attrs.key,
      item:JSON.parse(JSON.stringify(this.$attrs.data))
    };
  },
  methods:{
    getValue(){
      return JSON.parse(JSON.stringify(this.item));
    }
  }
}
</script>
