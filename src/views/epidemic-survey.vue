<template>
  <div class="container">
    <div class='_header'>
      <div class='header-wrap'>
        <span class="title">廊坊市妇幼保健院</span>
        <span class="sub-title">新冠肺炎疫情期间流行病学调查表</span>
      </div>
    </div>
    <div class='divNotice'>
      <span style='color:red;font-size:14px'>
        根据《中华人民共和国传染病防治法》以及当前疫情防控要求，需要对您进行医学询问，请您如实回答。
      </span>
      <wx-open-launch-weapp
        id="launch-btn"
        username="gh_dc5faf6be488"
        path="publicService/pages/riskArea/index.html?previoufooter=本服务由国家卫生健康委提供&previoutitle=疫情风险等级查询"
        @error="handleErrorFn"
        @launch="handleLaunchFn"
      >
        <script type="text/wxtag-template">
          <style>
            .wrap {
              /*width: 100%;*/
              /*margin-top: 33.5px;*/
              /*margin-left: 40px;*/
              /*display: flex;*/
              /*flex-direction: row;*/
              /*justify-content: flex-end !important;*/
              display: flex;
              flex-direction: row;
              align-items: center;
              margin-top: 6px;
            }

            .forward {
              margin-left: 8px;
              width: 14px;
              height: 14px;
            }

          </style>
          <!--          <view class="div_xiaoyou">-->
          <!--            <image src="{{arrowBase64}}" class="img3"/>-->
          <!--          </view>-->
          <view class='wrap'>
            <text style='color:#3991fa;font-size:14px'>全国疫情风险地区实时数据查询</text>
            <image src="{{arrowBase64}}" class='forward'/>
          </view>
        </script>
      </wx-open-launch-weapp>
    </div>
    <van-cell-group>
      <van-field required v-model="name" label="姓名" placeholder="请输入姓名"/>
      <van-field required v-model="idCard" label="身份证号" placeholder="请输入身份证号"/>
      <van-field required type="tel" v-model="phone" label="手机号" placeholder="请填写患者手机号"/>
      <van-field required v-model="addrHome" label="家庭住址" placeholder="请填写住址，详细至门牌号"/>
      <van-field required readonly right-icon="arrow" @click="choiceClinicDept" v-model="clinicDept" label="就诊科室"
                 placeholder="请选择就诊科室"/>
      <van-field required readonly right-icon="arrow" @click="choicePersonType" v-model="personType" label="人群分类"
                 placeholder="请选择人群分类"/>
      <van-field required readonly right-icon="arrow" @click="choicePersonType" v-model="personType" label="22类人群"
                 placeholder="请选择22类人群"/>
      <van-field type="digit" v-model="temperature" label="当前体温" placeholder="请填写当前体温"/>
      <van-field readonly right-icon="arrow" @click="choiceJobCase" v-model="job" label="从业状况" placeholder="请选择从业状况"/>
      <van-field v-model="entourageName" label="陪同人员" placeholder="请填写陪同人真实姓名"/>
      <van-field v-model="entourageIdCard" label="身份证号" placeholder="请填写陪同人身份证号"/>
      <van-field readonly right-icon="arrow" @click="choicePatientRelation" v-model="patientRelation" label="与患者关系"
                 placeholder="请选择与患者关系"/>
    </van-cell-group>
    <div style='display:flex;flex-direction:column;margin-left:15px;margin-top:10px;margin-right:15px'>
      <div style='display:flex;flex-direction:row;'>
        <span style='color:red;font-size:14px;margin-right:2px;'>*</span>
        <span style='color:#333;font-size:14px' class='notice'>1.发病前14天内是否有病例或无症状感染者报告社区的居住或旅行史？</span>
      </div>
      <van-radio-group class="radio-group" v-model="firstValue" direction="horizontal" @change="firstValueChange">
        <van-radio name="1" icon-size="20px" checked-color="#3991fa">有</van-radio>
        <van-radio name="0" icon-size="20px" checked-color="#3991fa">无</van-radio>
      </van-radio-group>
    </div>
    <div style='display:flex;flex-direction:column;margin-left:15px;margin-top:10px;margin-right:15px'>
      <div style='display:flex;flex-direction:row;'>
        <span style='color:red;font-size:14px;margin-right:2px;'>*</span>
        <span style='color:#333;font-size:14px' class='notice'>2.发病前14天内是否与新冠病毒核酸检测/IGg/IGM阳性或无症状感染者有接触史？</span>
      </div>
      <van-radio-group class="radio-group" v-model="secondValue" direction="horizontal" @change="secondValueChange">
        <van-radio name="1" icon-size="20px" checked-color="#3991fa">有</van-radio>
        <van-radio name="0" icon-size="20px" checked-color="#3991fa">无</van-radio>
      </van-radio-group>
    </div>
    <div style='display:flex;flex-direction:column;margin-left:15px;margin-top:10px;margin-right:15px'>
      <div style='display:flex;flex-direction:row;'>
        <span style='color:red;font-size:14px;margin-right:2px;'>*</span>
        <span style='color:#333;font-size:14px' class='notice'>2.发病前14天内是否与新冠病毒核酸检测/IGg/IGM阳性或无症状感染者有接触史？</span>
      </div>
      <van-radio-group class="radio-group" v-model="thirdValue" direction="horizontal" @change="thirdValueChange">
        <van-radio name="1" icon-size="20px" checked-color="#3991fa">有</van-radio>
        <van-radio name="0" icon-size="20px" checked-color="#3991fa">无</van-radio>
      </van-radio-group>
    </div>
    <div style='display:flex;flex-direction:column;margin-left:15px;margin-top:10px;margin-right:15px'>
      <div style='display:flex;flex-direction:row;'>
        <span style='color:red;font-size:14px;margin-right:2px;'>*</span>
        <span style='color:#333;font-size:14px' class='notice'>4.近14天您所在范围内，如家庭、办公室、学校班级、车间、工地等场所，是否出现2例及以上发热和/或呼吸道症状的病例？</span>
      </div>
      <van-radio-group class="radio-group" v-model="forthValue" direction="horizontal" @change="forthValueChange">
        <van-radio name="1" icon-size="20px" checked-color="#3991fa">有</van-radio>
        <van-radio name="0" icon-size="20px" checked-color="#3991fa">无</van-radio>
      </van-radio-group>
    </div>
    <div style='display:flex;flex-direction:column;margin-left:15px;margin-top:10px;margin-right:15px'>
      <div style='display:flex;flex-direction:row;'>
        <span style='color:red;font-size:14px;margin-right:2px;'>*</span>
        <span style='color:#333;font-size:14px' class='notice'>5.您2周内有以下表现吗？</span>
      </div>
      <van-radio-group class="radio-group" v-model="fifthValue" direction="horizontal" @change="fifthValueChange">
        <van-radio name="1" icon-size="20px" checked-color="#3991fa">有</van-radio>
        <van-radio name="0" icon-size="20px" checked-color="#3991fa">无</van-radio>
      </van-radio-group>
    </div>
    <van-radio-group :disabled="disabled" class="radio-group radio_6" v-if="isShow" v-model="sixValue"
                     direction="horizontal" @change="sixValueChange">
      <van-radio name="1" icon-size="20px" checked-color="#3991fa">发热</van-radio>
      <van-radio name="2" icon-size="20px" checked-color="#3991fa">咳嗽</van-radio>
      <van-radio name="3" icon-size="20px" checked-color="#3991fa">腹泻</van-radio>
      <van-radio name="4" icon-size="20px" checked-color="#3991fa">新冠肺炎其他症状</van-radio>
    </van-radio-group>
    <div class='dash-line' style='margin-top:10px'/>
    <div style='margin-top:10px;margin-left:15px;display:flex;'>
      <van-checkbox icon-size="20px" checked-color="#3991fa" v-model="checked" shape="square">
        <span style="color:red;font-size:13px;"
              class="agreeProtocol">本人承诺，以上情况全部属实，如故意隐瞒病情或流行病学史导致漏诊或疫情传播，自愿承担相关法律责任。</span>
      </van-checkbox>
    </div>
    <div class='footer'>
      <div class='btn-submit-view' @click="submit">
        <span class='btn-submit-text'>提交</span>
      </div>
    </div>
    <van-popup v-model="showClinicDept" round position="bottom">
      <van-picker
        title="就诊科室"
        show-toolbar
        :columns="clinicDeptRange"
        @cancel="showClinicDept = false"
        @confirm="clinicConfirm"
      />
    </van-popup>
    <van-popup v-model="showPersonType" round position="bottom">
      <van-picker
        title="人群分类"
        show-toolbar
        :columns="personTypeRange"
        @cancel="showPersonType = false"
        @confirm="personTypeConfirm"
      />
    </van-popup>
    <van-popup v-model="show22PersonType" round position="bottom">
      <van-picker
        title="22类人群"
        show-toolbar
        :columns="personType22Range"
        @cancel="show22PersonType = false"
        @confirm="personType22Confirm"
      />
    </van-popup>
    <van-popup v-model="showJob" round position="bottom">
      <van-picker
        title="从业状况"
        show-toolbar
        :columns="jobCaseRange"
        @cancel="showJob = false"
        @confirm="jobConfirm"
      />
    </van-popup>
    <van-popup v-model="showPatientRelation" round position="bottom">
      <van-picker
        title="与患者关系"
        show-toolbar
        :columns="patientRelationRange"
        @cancel="showPatientRelation = false"
        @confirm="patientRelationConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import {arrowBase64} from '../assets/base64/arrowBase64'
import {Toast} from "vant";
import {isMobile} from "../utils/CommonUtil";

const {isIdCard} = require("../utils/CommonUtil");

const {isEmpty} = require("../utils/EmptyUtil");
export default {
  name: "epidemic-survey",
  props: {
    // Taro.navigateToMiniProgram({
    //   appId:'wxbebb3cdd9b331046',
    //   path:'publicService/pages/riskArea/index?previoufooter=本服务由国家卫生健康委提供&previoutitle=疫情风险等级查询'
    // })

  },
  components: {},
  data() {
    return {
      arrowBase64,
      name: '',
      idCard: '',
      phone: '',
      addrHome: '',
      clinicDept: '',
      clinicDeptRange: [],
      showClinicDept: false,
      showPersonType: false,
      show22PersonType: false,
      showPatientRelation: false,
      job: '',
      entourageName: '',
      personType: '',
      personType22: '',
      temperature: '',
      entourageIdCard: '',
      showJob: false,
      disabled: true,
      jobCaseRange: [],
      patientRelation: '',
      personTypeRange: [],
      personType22Range: [],
      patientRelationRange: [
        "本人",
        "父亲",
        '母亲',
        "爷爷",
        '奶奶',
        '丈夫',
        '妻子',
        '儿子',
        '女儿',
        '其他亲属',
        '非亲属',
      ],
      firstValue: "",
      secondValue: "",
      thirdValue: "",
      forthValue: "",
      fifthValue: "",
      sixValue: "",
      isShow: true,
      checked: false,
    }
  },
  async mounted() {
  },
  methods: {
    initData:async function() {
      // callDeptListApi(),
      let url = window.location.href.split('#')[0];
      const res =await Promise.all([getWxConfig(url),getJobCaseDicApi(),callXG22ListApi(),callXGPersonSortApi(),callDeptListApi()]);
      console.log(333,res);
      if(res[0].code ==200){
        // wx.config({
        //   debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //   appId: res.appId, // 必填，公众号的唯一标识
        //   timestamp: res.timestamp, // 必填，生成签名的时间戳
        //   nonceStr: res.nonceStr, // 必填，生成签名的随机串
        //   signature: res.signature,// 必填，签名
        //   jsApiList: [
        //     'wx-open-launch-weapp',
        //   ],
        //   openTagList: ['wx-open-launch-weapp'] // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
        // });
        // // 通过ready接口处理成功验证
        // wx.ready(function () {
        //   // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中
        // });
        // // 通过error接口处理失败验证
        // wx.error(function (res) {
        //   // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名
        // });
      }
      if(res[1].code===200){
        this.JobRange(res[0].data)
      }
      if(res[2].code==200){
        this.personTypeRange22(res[1].data);
      }
      if(res[3].code ==200){
        this.personTypeRange(res[2].data);
      }
      if(res[4].code == 200){
        this.clinicDeptRange(res[3].data);
      }


    },
    handleErrorFn(e) {

    },
    handleLaunchFn(e) {

    },
    firstValueChange: function (value) {
      this.firstValue = value;
    },
    secondValueChange: function (value) {
      this.secondValue = value;
    },
    thirdValueChange: function (value) {
      this.thirdValue = value;
    },
    forthValueChange: function (value) {
      this.forthValue = value;
    },
    fifthValueChange: function (value) {
      this.disabled = false;
      this.fifthValue = value;
      if (this.fifthValue == 1) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    sixValueChange: function (value) {
      this.sixthValue = value;
    },

    choiceClinicDept: function () {
      this.showClinicDept = true;
    },
    clinicConfirm: function () {

    },
    choicePersonType: function () {

    },
    choiceJobCase: function () {

    },
    choicePatientRelation: function () {

    },
    patientRelationConfirm: function () {

    },
    jobConfirm: function () {

    },
    personType22Confirm: function () {

    },
    personTypeConfirm: function () {

    },
    submit: async function () {
      let sex = '', age = 0;
      if (isEmpty(this.name)) {
        Toast({
          message: '姓名不能为空',
          duration: 3500,
          forbidClick: true
        })
        return;
      }
      if (isEmpty(this.idCard)) {
        Toast({
          message: '身份证号不能为空',
          duration: 3500,
          forbidClick: true,
        })
        return;
      }
      if (!isIdCard(this.idCard)) {
        Toast({
          message: '身份证号格式不正确',
          duration: 3500,
        })
        return;
      }
      let org_birthday = this.idCard.substring(6, 14);
      let org_gender = this.idCard.substring(16, 17);
      sex = org_gender % 2 == 1 ? "男" : "女";
      let birthday = org_birthday.substring(0, 4) + "-" + org_birthday.substring(4, 6) + "-" + org_birthday.substring(6, 8);
      let birthdays = new Date(birthday.replace(/-/g, "/"));
      let d = new Date();
      age = d.getFullYear() - birthdays.getFullYear() - (d.getMonth() < birthdays.getMonth() || (d.getMonth() == birthdays.getMonth() && d.getDate() < birthdays.getDate()) ? 1 : 0);
      // console.log('生日转换时间', birthdays)
      // console.log('年龄', age)
      if (isEmpty(this.phone)) {

        Toast({
          message: '手机号不能为空',
          duration: 3500,
          forbidClick: true
        })
        return;
      }
      if (!isMobile(this.phone)) {
        Toast({
          message: '手机号格式不正确',
          duration: 3500,
          forbidClick: true
        })
        return;
      }

      if (isEmpty(this.addrHome)) {
        Toast({
          message: '家庭住址不能为空',
          duration: 3500,
          forbidClick: true
        })
        return;
      }
      if (isEmpty(this.clinicDept)) {
        Toast({
          message: '请选择就诊科室',
          duration: 3500,
          forbidClick: true
        })
        return;
      }
      if (isEmpty(this.personType)) {
        Toast({
          message: '请选择人群分类',
          duration: 3500,
          forbidClick: true
        })
        return;
      }
      if (isEmpty(this.personType22)) {
        Toast({
          message: '请选择22类人群',
          duration: 3500,
          forbidClick: true
        })
        return;
      }
      if (!isEmpty(this.temperature)) {
        Toast({
          message: '请请填写体温',
          duration: 3500,
          forbidClick: true
        })
        return;

      }
      if (!isEmpty(this.entourageName)) {
        if (isEmpty(this.entourageIdCard)) {
          Toast({
            message: '陪同人身份证号不能为空',
            duration: 3500,
            forbidClick: true
          })
          return;
        }
        if (!isIdCard(this.entourageIdCard)) {
          Toast({
            message: '陪同人身份证号格式不正确',
            duration: 3500,
            forbidClick: true
          })
          return;
        }
        if (this.entourageIdCard === this.idCard) {
          Toast({
            message: '陪同人身份证号不允许与就诊人重复',
            duration: 3500,
            forbidClick: true
          })
          return;
        }
        if (isEmpty(this.patientRelation)) {
          Toast({
            title: '请选择患者关系',
            duration: 3500,
            forbidClick: true
          })
          return;
        }
      }

      if (isEmpty(this.firstValue) || isEmpty(this.secondValue) || isEmpty(this.thirdValue) || isEmpty(this.forthValue) || isEmpty(this.fifthValue)) {
        Toast({
          message: '存在未完成的内容，请完成后再提交',
          duration: 3500,
          forbidClick: true
        })
        return;
      }
      if (this.fifthValue == 1) {
        if (isEmpty(this.sixthValue)) {
          wx.showToast({
            title: '请选择症状',
            icon: 'none'
          })
          return;
        }
      }
      if (!this.checked) {
        wx.showToast({
          title: '尚未完成流调表，请勾选页面下方承诺内容',
          icon: 'none'
        })
        return;
      }
      // const symptomList = [
      //   fifthValue,
      //   secondValue,
      //   thirdValue,
      //   forthValue,
      //   fifthValue
      // ];
      // let bool = symptomList.some(item => item == 1);
      Toast.loading({
        message: '请稍等...',
        forbidClick: true,

      })
      const {openId: userId} = localStorage.getItem('openId');
      const res = await callAddEpidemicSurveyApi({
        userId,
        idCard: this.idCard,
        // personId,
        isCase: this.firstValue,
        isCthistory: this.secondValue,
        isSymptoms: this.thirdValue,
        isTrhistory: this.forthValue,
        isWeekbx: this.fifthValue,
        isWeekbxOther: this.sixthValue,
        job: this.jobId,
        jobName: this.jobName,
        patientName: this.name,
        phone: this.phone,
        sex,
        temperature: this.temperature,
        addrHome: this.addrHome,
        dpId: this.clinicDeptId,
        dpName: this.clinicDept,
        throng: this.personTypeId,//人群分类字典id
        throngName: this.personType,//人群分类名字
        spThrong: this.personTypeId22,//特殊人群分类字典id
        spThrongName: this.personType22,//特殊人群分类名字
        entourageIdCard: this.entourageIdCard,
        entourageName: this.entourageName,
        entourageRelation: this.patientRelation
      })
      if (res.code == 200) {
         this.$router.push({ path:'/success' ,query:{data:res.data} })

      } else {
        Toast({
          message: res.msg,
          duration: 3500,
          forbidClick: true
        })
      }
      Toast.clear(true);

      // // Taro.navigateTo({
      // //   url: `/pages/home/confirm/confirm?item=${JSON.stringify(item)}&userType=2`
      // // })
      //
    },


  },

}
</script>

<style scoped lang="less">
.container {
  height: 100%;
  background: #fff;
  overflow-y: scroll;
}

._header {
  height: 60px;
  margin: 0 20px 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  &:after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    content: '';
    -webkit-transform: scale(0.5);
    transform: scaleY(0.5);
    border-top: 1px dashed #eee;
  }

  .header-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      color: #333;
      font-size: 15px;
    }

    .sub-title {
      color: #333;
      font-size: 15px;
    }
  }
}

.divNotice {
  display: flex;
  padding: 0 20px 0 20px;
  height: 100px;
  flex-direction: column;
  justify-content: center;
  position: relative;
  //&:after {
  //  display: block;
  //  position: absolute;
  //  left: 0;
  //  bottom: 0;
  //  width: 100%;
  //  content: '';
  //  -webkit-transform: scale(0.5);
  //  transform: scaleY(0.5);
  //  border-top: 1px solid #eee;
  //
  //}
}

.radio-group {
  margin-top: 15px;
  padding-left: 20px;
}

.notice, .agreeProtocol {
  span-justify: inter-ideograph;
  span-align: justify;
}

.dash-line {
  height: 0;
  border-bottom: 1px dashed #eee;
  transform: scaleY(0.5);
}

.submit {

}
</style>
