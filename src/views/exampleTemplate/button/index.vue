<template>
  <div class="padding10">

    <div class="exampleDiv">
      <div class="title h3">默认按钮</div>
      <el-button >默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div>

    <div class="exampleDiv">
      <div class="title h3">圆角按钮</div>
      <el-button round>圆角按钮</el-button>
      <el-button type="primary" round>主要按钮</el-button>
      <el-button type="success" round>成功按钮</el-button>
      <el-button type="info" round>信息按钮</el-button>
      <el-button type="warning" round>警告按钮</el-button>
      <el-button type="danger" round>危险按钮</el-button>
    </div>

    <div class="exampleDiv">
      <div class="title h3">Icon按钮</div>
      <el-button icon="el-icon-search" circle></el-button>
      <el-button type="primary" icon="el-icon-edit" circle></el-button>
      <el-button type="success" icon="el-icon-check" circle></el-button>
      <el-button type="info" icon="el-icon-message" circle></el-button>
      <el-button type="warning" icon="el-icon-star-off" circle></el-button>
      <el-button type="danger" icon="el-icon-delete" circle></el-button>
    </div>

    <div class="exampleDiv">
      <div class="title h3">水波纹按钮</div>
      <el-button v-waves>Button</el-button>
      <el-button type="primary" v-waves>Button</el-button>
      <el-button type="success" v-waves>Button</el-button>
      <el-button type="info" v-waves>Button</el-button>
      <el-button type="warning" v-waves>Button</el-button>
      <el-button type="danger" v-waves>Button</el-button>
    </div>

    <div class="exampleDiv">
      <div class="title h3">动画按钮</div>
      <div class="pan-btn pan-btn-mini primary-btn" >
        Button
      </div>
      <div class="pan-btn pan-btn-mini success-btn">
        Button
      </div>
      <div class="pan-btn pan-btn-mini danger-btn">
        Button
      </div>
      <div class="pan-btn pan-btn-mini warning-btn">
        Button
      </div>
    </div>

    <div class="exampleDiv">
      <div class="title h3">动画按钮尺寸</div>
      <div class="pan-btn pan-btn-mini primary-btn">
        Button
      </div>
      <div class="pan-btn pan-btn-small primary-btn">
        Button
      </div>
      <div class="pan-btn pan-btn-medium primary-btn">
        Button
      </div>
      <div class="pan-btn primary-btn">
        Button
      </div>
    </div>

    <div class="exampleDiv">
      <div class="title h3">禁用按钮</div>
      <el-button disabled>默认按钮</el-button>
      <el-button type="primary" disabled>主要按钮</el-button>
      <el-button type="success" disabled>成功按钮</el-button>
      <el-button type="info" disabled>信息按钮</el-button>
      <el-button type="warning" disabled>警告按钮</el-button>
      <el-button type="danger" disabled>危险按钮</el-button>
    </div>

    <div class="exampleDiv">
      <div class="title h3">文字按钮</div>
      <el-button type="text">文字按钮</el-button>
      <div class="title h3">文字禁用按钮</div>
      <el-button type="text" disabled>文字按钮</el-button>
    </div>

    <div class="exampleDiv">
      <div class="title h3">图标按钮</div>
      <el-button type="primary" icon="el-icon-edit"></el-button>
      <el-button type="primary" icon="el-icon-share"></el-button>
      <el-button type="primary" icon="el-icon-delete"></el-button>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
      <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>

    <div class="exampleDiv">
      <div class="title h3">按钮组</div>
      <el-button-group>
        <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
        <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>&nbsp;&nbsp;
      <el-button-group>
        <el-button type="primary" icon="el-icon-edit"></el-button>
        <el-button type="primary" icon="el-icon-share"></el-button>
        <el-button type="primary" icon="el-icon-delete"></el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    init() {}
  }
}
</script>

<style lang='scss' scoped>

</style>
