<template>
  <div class="container">
    <sHeader name="流调成功"/>
    <div class='qrcode-view'>
      <span class='time'>填写时间：{{ moment().format('YYYY-MM-DD HH:mm') }}</span>
      <div class='qrcode-wrap'>
        <div id="qrcode" ref="qrcode"></div>
      </div>
    </div>
    <!--    <div class='list-row' @click="onGoMiniProgram" style='margin-top:10PX'>-->
    <!--      <div class='list-row-wrap'>-->
    <!--        <span class='title'>河北健康码</span>-->
    <!--        <img src="../assets/forward.svg" class='img'/>-->
    <!--      </div>-->
    <!--    </div>-->
    <wx-open-launch-weapp
      id="launch-btn"
      username="gh_dc5faf6be488"
      path="pages/index/index.html"
      @error="handleErrorFn"
      @launch="handleLaunchFn"
    >
      <script type="text/wxtag-template">
        <style>
          .list-row {
            display: flex;
            flex-direction: column;
            height: 44px;
            padding-left: 20px;
            padding-right: 20PX;
            justify-content: center;
          }

          .list-row-wrap {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }

          .img {
            width: 14px;
            height: 22px;
          }

          .title {
            font-family: PingFangSC-Medium;
            color: #191F25;
            font-size: 14PX;
          }
        </style>
        <view class='list-row'>
          <view class='list-row-wrap'>
            <text class='title'>国务院行程码</text>
            <image src="{{forwardBase64}}" class='img'/>
          </view>
        </view>
      </script>
    </wx-open-launch-weapp>
    <!--    <div class='list-row' @click="$onGoMiniProgram">-->
    <!--      <div class='list-row-wrap'>-->
    <!--        <span class='title'>国务院行程码</span>-->
    <!--        <img src="../assets/forward.svg" class='img'/>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class='footer'>
      <div class='btn-submit-div' @click="back">
        <span class='btn-submit-span'>返回</span>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2';
import moment from "moment"
import sHeader from '../components/SimpleHeader'
import {forwardBase64} from '../assets/base64/forwardBase64'
export default {
  name: "epidemic-success",
  components: {
    sHeader,
  },
  data() {
    return {
      forwardBase64,
      foregroundColor: '#000000',
      backgroundColor: '#ffffff',
      moment,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.qrCode('qrcode')
    })
  },
  methods: {

    handleErrorFn: function () {

    },
    handleLaunchFn: function () {

    },
    qrCode: function (url) {
      let qrcode = new QRCode('qrcode', {
        width: 180, //图像宽度
        height: 180, //图像高度
        text: url,
        colorDark: this.foregroundColor, //前景色
        colorLight: this.backgroundColor, //背景色
        typeNumber: 10,
        correctLevel: QRCode.CorrectLevel.L //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
      })
      qrcode.clear() //清除二维码
      qrcode.makeCode(url) //生成另一个新的二维码
    },
    back: function () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.container {
  height: 100%;
  background: #fff;
  overflow-y: scroll;
}

.qrcode-view {
  margin-top: 84px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .qrcode-wrap {
    top: 10PX;
    position: relative;

    .qrcode {
      width: 122PX;
      height: 122PX;
    }

    .img {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      width: 48PX;
      height: 48PX;
    }
  }

  .time {
    font-family: PingFangSC-Regular;
    font-size: 18PX;
  }

}
</style>
