<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin: 20px 0; text-align:right;">
      <el-button @click="addItem">添加新用户</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="account"
        label="账号">
      </el-table-column>
      <el-table-column
        prop="date"
        label="创建日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date"
        label="更新日期"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        width="140"
        >
        <template slot-scope="scope">
          <el-button @click="viewItem(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="editItem(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div

      style="margin: 10px 0;text-align:right;"
      >
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentpage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="40">
    </el-pagination>
  </div>
  </div>
</template>

<script>
import {MessageBox,Form,FormItem,Input} from 'element-ui';
import UserForm from './user.vue';
import {Collection,Model} from '@/utils';
export default {
  data() {
    let collection = new Collection({url:'/users'});
    return {
      collection,
      currentpage:1,
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        account: 'bukuta@c7h12.com',
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        account: 'bukuta@c7h12.com',
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        account: 'bukuta@c7h12.com',
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        account: 'bukuta@c7h12.com',
      }]
    }
  },
  mounted(){
    this.fetchItems();
  },
  methods:{
    fetchItems(){
      this.collection.fetch().then(rs=>{
        console.log('fetched',rs);
      });
    },
    handleCurrentChange(page){
      console.log('currentchange',page);
    },
    addItem(item){
      item={name:'',password:'',account:''};
      console.log('addItem',item);
      //this.$router.push('/users/'+item.id);
      let message = (
        <UserForm key={'additem-'+Date.now()} data={item}/>
      );
      MessageBox({message,title:'添加用户',customClass:"my-dialog"}).then(rs=>{
        console.log(rs,message.componentInstance);
        let instance = message.componentInstance;
        let data = instance.getValue();
        console.log(data);
        this.collection.create(data).then(rs=>{
          return rs;
        });
      },err=>{
      });
    },
    editItem(item){
      console.log('editItem',item);
      //this.$router.push('/users/'+item.id);
      let newUser = {name:'',account:'',password:''};
      let message = (
        <UserForm key={'edititem-'+Date.now()} data={item}/>
      );
      MessageBox({message,title:'编辑用户',customClass:"my-dialog"}).then(rs=>{
        console.log(rs,message.componentInstance);
        let instance = message.componentInstance;
        let data = instance.getValue();
        console.log(data);
      },err=>{
      });
    },
    viewItem(item){
      console.log('viewItem',item);
      //this.$router.push('/users/'+item.id);
      let message = (
        <Form style="">
        <FormItem label="名字">
          <span >{item.name}</span>
        </FormItem>
        </Form>
      );
      MessageBox({message,title:'查看用户',customClass:"my-dialog"}).then(rs=>{
        console.log(rs);
      },err=>{
      });
    }
  },
}
</script>
