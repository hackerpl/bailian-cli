**endPointer：** /multimodal-generation/generation

## 请求参数

````<section id="f83b1c49d5qr1" class="section"><table bordertype="no-border" id="d87a249b55qxd" outputclass="api-reference column-layout" tablewidth="100" tablecolswidth="53.93 46.07" autofit="true" class="api-reference column-layout table table-no-border"><colgroup colwidth="1.08*" style="width:53.93%"></colgroup><colgroup colwidth="0.92*" style="width:46.07%"></colgroup><tbody class="tbody"><tr id="99c9f584c45su" outputclass="test" class="test"><td id="2bd0a0e250y3g" rowspan="1" style="vertical-align:top" colspan="1"><h4 id="afcd41d2b57zf">请求参数</h4></td><td id="229d2c019fsy1" rowspan="8" style="vertical-align:top" colspan="1"><section id="f0e4b3968fgp8" outputclass="stick-top" class="stick-top section"><section id="360c1d3f3cdmv" data-tag="tabbed-content-box" outputclass="tabbed-content-box" props="china" data-cond-props="china" class="tabbed-content-box section"><div class="tab-box"><div class="tab-item-container"><div class="tab-item" id="05ad58a0dd5kd" data-spm-anchor-id="0.0.0.i3.184c707fFNDFz8">单图编辑</div><div class="tab-item selected-tab-item" id="cd924634admyd" data-spm-anchor-id="0.0.0.i2.184c707fFNDFz8">多图融合</div></div><div class="tab-box-button" style="visibility: hidden;">
  <div class="left deactivateBtn"><i class="help-iconfont help-icon-zhankai1"></i></div>
  <div class="right"><i class="help-iconfont help-icon-zhankai1"></i></div>
  </div></div><section id="777bb5e7973bz" class="section" style="display: none;"><p id="cc7f4d85761y4">此处以使用<code data-tag="code" id="d395361640bpa" class="code">qwen-image-2.0-pro</code>模型输出<span class="help-letter-space"></span>2<span class="help-letter-space"></span>张图片为例。</p>
    <div class="help-code-block">
      <div class="code-tools">
        <div class="left-tools">
        </div>
        <div class="right-tools">
          <i class="theme-switch-btn help-iconfont help-icon-baitian" title="更改代码主题"></i>
      <i class="copy-btn help-iconfont help-icon-fuzhi" title="复制代码"></i>
        </div>
      </div>
      <pre code-type="xCode" id="1291db4f61ncn" index="0" data-tag="codeblock" outputclass="language-curl" class="pre codeblock language-curl"><code data-highlighted="yes" class="hljs language-curl"><span class="hljs-keyword">curl</span> <span class="hljs-literal">--location</span> <span class="hljs-string">'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation'</span> \
<span class="hljs-literal">--header</span> <span class="hljs-string">'Content-Type: application/json'</span> \
<span class="hljs-literal">--header</span> <span class="hljs-string">"Authorization: Bearer $DASHSCOPE_API_KEY"</span> \
<span class="hljs-literal">--data</span> <span class="hljs-string">'{
    "model": "qwen-image-2.0-pro",
    "input": {
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "image": "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/fpakfo/image36.webp"
                    },
                    {
                        "text": "生成一张符合深度图的图像，遵循以下描述：一辆红色的破旧的自行车停在一条泥泞的小路上，背景是茂密的原始森林"
                    }
                ]
            }
        ]
    },
    "parameters": {
        "n": 2,
        "negative_prompt": " ",
        "prompt_extend": true,
        "watermark": false,
        "size": "1536*1024"
    }
}'</span></code></pre>
    </div>
    </section><section id="54fa26bdda9fp" class="section" style="display: block;"><p id="e1d05ee58dwqk">此处以使用<code data-tag="code" id="4dc9ac1083x05" data-init-id="d395361640bpa" class="code">qwen-image-2.0-pro</code>模型输出<span class="help-letter-space"></span>2<span class="help-letter-space"></span>张图片为例。</p>
    <div class="help-code-block">
      <div class="code-tools">
        <div class="left-tools">
        </div>
        <div class="right-tools">
          <i class="theme-switch-btn help-iconfont help-icon-baitian" title="更改代码主题"></i>
      <i class="copy-btn help-iconfont help-icon-fuzhi" title="复制代码"></i>
        </div>
      </div>
      <pre code-type="xCode" id="45b3bbac3elur" index="0" data-tag="codeblock" outputclass="language-curl" class="pre codeblock language-curl"><code data-highlighted="yes" class="hljs language-curl"><span class="hljs-keyword">curl</span> <span class="hljs-literal">--location</span> <span class="hljs-string">'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation'</span> \
<span class="hljs-literal">--header</span> <span class="hljs-string">'Content-Type: application/json'</span> \
<span class="hljs-literal">--header</span> <span class="hljs-string">"Authorization: Bearer $DASHSCOPE_API_KEY"</span> \
<span class="hljs-literal">--data</span> <span class="hljs-string">'{
    "model": "qwen-image-2.0-pro",
    "input": {
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "image": "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/thtclx/input1.png"
                    },
                    {
                        "image": "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/iclsnx/input2.png"
                    },
                    {
                        "image": "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/gborgw/input3.png"
                    },
                    {
                        "text": "图1中的女生穿着图2中的黑色裙子按图3的姿势坐下"
                    }
                ]
            }
        ]
    },
    "parameters": {
        "n": 2,
        "negative_prompt": " ",
        "prompt_extend": true,
        "watermark": false,
        "size": "1024*1536"
    }
}'</span></code></pre>
    </div>
    </section></section></section><section id="bffd5cb561698" class="section"></section></td></tr><tr id="526a4a47a9t4r"><td id="d042b7ac27efy" rowspan="1" style="vertical-align:middle" colspan="1"><h5 id="79473e45c592d" data-spm-anchor-id="0.0.0.i1.184c707fFNDFz8">请求头（Headers）</h5></td></tr><tr id="c2234225c7e2d" outputclass="test" class="test"><td id="895606e6e52lk" rowspan="1" style="vertical-align:middle" colspan="1"><section id="d398337f8cu7f" data-ref-searchable="yes" docid="4720193" data-source="reuse_library" is-conref="true" class="section"><p id="b35b36152auao"><b>Content-Type </b><code data-tag="code" code-type="xCode" id="9d0e02b383aea" class="code"><i>string</i></code><i> </i><b>（必选）</b></p><p jc="left" id="c84336268andm" style="text-align:left">请求内容类型。此参数必须设置为<code data-tag="code" code-type="xCode" id="e629c56e1e0ss" class="code">application/json</code>。</p></section></td></tr><tr id="311992229ek0y" outputclass="test" class="test"><td id="8f4c7cba33au3" rowspan="1" style="vertical-align:middle" colspan="1"><section id="6f9e428fde39p" data-ref-searchable="yes" docid="4720193" data-source="reuse_library" is-conref="true" class="section"><p id="ac48af82483to"><b>Authorization </b><code data-tag="code" code-type="xCode" id="7c35409e8enfj" class="code"><i>string</i></code><b>（必选）</b></p><p jc="left" id="a1b0e25ac4cv4" style="text-align:left">请求身份认证。接口使用阿里云百炼<span class="help-letter-space"></span>API-Key<span class="help-letter-space"></span>进行身份认证。示例值：Bearer sk-xxxx。</p></section></td></tr><tr id="e092bbc0acx5v" outputclass="test" class="test"><td id="a1ba292620gfd" rowspan="1" style="vertical-align:middle" colspan="1"><h5 id="45d1fa2260zn6">请求体（Request Body）</h5></td></tr><tr id="d6df745f2c4ds" outputclass="test" class="test"><td id="912ef0dbb3esm" rowspan="1" style="vertical-align:middle" colspan="1"><section id="1009dd5240gfv" class="section"><p id="30c7a30242my6"><b>model</b> <code data-tag="code" code-type="xCode" id="6e2610e668vhz" class="code"><i>string</i></code> <b>（必选）</b></p><p id="58e997d20djmd">模型名称，示例值<span class="help-letter-space"></span>qwen-image-2.0-pro。</p></section></td></tr><tr id="bab63b9a1020c"><td id="fcd8d01bcaiou" rowspan="1" style="vertical-align:middle" colspan="1"><section id="d32a118887394" class="section"><p id="add637b6adnaf"><b>input</b> <code data-tag="code" code-type="xCode" id="1164859cb0cis" class="code"><i>object</i></code> <b>（必选）</b></p><p id="fde6d2cc97vxk">输入参数对象，包含以下字段：</p>
    <section class="collapse expanded" id="b547ea59651ml">
      <div class="expandable-title-bold">
        <span class="title"><p id="7d853687e0g0i" data-tag="expandable-title" class="expandable-title"><b>属性</b></p></span>
        <i class="icon help-iconfont help-icon-zhankai1 smallFont"></i>
      </div>
      <div class="expandable-content">
        <section id="49af94f7d97ys" class="section"><p id="4c68b336d913t"><b>messages</b> <code data-tag="code" code-type="xCode" id="925ad8357bx8l" class="code"><i>array</i></code> <b>（必选）</b></p><p id="a8703900728au">请求内容数组。<b>当前仅支持单轮对话</b>，因此数组内<b>有且只有一个对象</b>，该对象包含<code data-tag="code" uuid="mfpc3bgjf1jjxfd3qw" id="bb68a9016faup" class="code">role</code>和<code data-tag="code" uuid="mfpc3bgjkiormylsvc" id="34eb604801xhd" class="code">content</code>两个属性。</p>
    <section class="collapse expanded" id="0e015253b75h9">
      <div class="expandable-title-bold">
        <span class="title"><p id="532c30df23x2b" data-tag="expandable-title" class="expandable-title"><b>属性</b></p></span>
        <i class="icon help-iconfont help-icon-zhankai1 smallFont"></i>
      </div>
      <div class="expandable-content">
        <section id="05d5c196e7op3" class="section"><p id="feabd0c630r0r"><b>role </b><code data-tag="code" id="ad982596c06zy" class="code"><i>string</i></code> <b>（必选）</b></p><p id="6468f23e8eb18">消息发送者角色，必须设置为<code data-tag="code" id="9caa52b0885l7" class="code">user</code>。</p></section><section id="3ecac848bettg" class="section"><p id="d2994ef7d7yfb"><b>content </b><code data-tag="code" id="e4d2984ef2r5j" class="code"><i>array</i></code> <b>（必选）</b></p><p id="d3bb5c365023e">消息内容，包含<span class="help-letter-space"></span>1-3<span class="help-letter-space"></span>张图像，格式为 <code data-tag="code" uuid="mfpe7ylgvmaq0dxq5g7" id="dce7f023ff7nn" class="code">{"image": "..."}</code>；以及单个编辑指令，格式为 <code data-tag="code" uuid="mfpe7ylg87qkaojjotd" id="d435ab98e545j" class="code">{"text": "..."}</code>。</p>
    <section class="collapse expanded" id="6f48864450h9x">
      <div class="expandable-title-bold">
        <span class="title"><p id="1f2fa63d13ig3" data-tag="expandable-title" class="expandable-title"><b>属性</b></p></span>
        <i class="icon help-iconfont help-icon-zhankai1 smallFont"></i>
      </div>
      <div class="expandable-content">
        <section id="eb2dfb4f51ai0" class="section"><p id="a31b794befmfh"><b>image</b> <code data-tag="code" id="64b3e088b7rrn" data-init-id="ad982596c06zy" class="code"><i>string</i></code> <b>（必选）</b></p><p id="fca75b593cwql">输入图像的 URL 或 Base64 编码数据。支持传入<span class="help-letter-space"></span>1-3<span class="help-letter-space"></span>张图像。</p><p id="3507a0b28aold">多图输入时，按照数组顺序定义图像顺序，输出图像的比例以最后一张为准。</p><p id="688506a8772jn"><b>图像要求：</b></p><ul id="bfd01b5cddfvg"><li id="d97b4915c7rej"><p id="4cb380029aac3">图像格式：JPG、JPEG、PNG、BMP、TIFF、WEBP<span class="help-letter-space"></span>和<span class="help-letter-space"></span>GIF。</p><blockquote id="1af42233981uq">输出图像为<span class="help-letter-space"></span>PNG<span class="help-letter-space"></span>格式，对于<span class="help-letter-space"></span>GIF<span class="help-letter-space"></span>动图，仅处理其第一帧。</blockquote></li><li id="cbca810dbbvq0"><p id="52c8cc3dc1myv">图像分辨率：为获得最佳效果，建议图像的宽和高均在<span class="help-letter-space"></span>384<span class="help-letter-space"></span>像素至<span class="help-letter-space"></span>3072<span class="help-letter-space"></span>像素之间。分辨率过低可能导致生成效果模糊，过高则会增加处理时长。</p></li><li id="61b83eddeb12g"><p id="dcbafd7dbfn7b">图像大小：不超过<span class="help-letter-space"></span>10MB。</p></li></ul><section id="2766232d9c6k9" class="section"><p id="dd65f42cfcpd4"><b>支持的输入格式</b></p><ol id="c911a504d6u18" start="1"><li id="d2edc54b9b2de"><p id="63d0bf0621vm8">公网<span class="help-letter-space"></span>URL：</p><ul id="d5e0f3f4d56ky"><li id="6bc19e78fe18b"><p id="6a4c9a838fj3c">支持 HTTP 和 HTTPS 协议。</p></li><li id="30c8cfebb0nr5"><p id="848cece38a2jg">示例值：<code data-tag="code" id="e493b12ebe4c9" class="code">https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/fpakfo/image36.webp</code>。</p></li></ul></li><li id="86cd90d5b8ash" props="china" data-cond-props="china"><p id="627c4283f8heq">临时<span class="help-letter-space"></span>URL：</p><ul id="f4304ae428z3k"><li id="76fb2346f0yoe"><p id="1f8d65eb15e2b">支持<span class="help-letter-space"></span>OSS<span class="help-letter-space"></span>协议，必须通过<a href="https://help.aliyun.com/zh/model-studio/get-temporary-file-url" id="843efaef06q1r" title="" class="xref">上传文件获取临时 URL</a>。</p></li><li id="d0a9cf9b4dpyb"><p id="1fb77c0e4bt3x">示例值：<code data-tag="code" id="2ea644e26dib0" class="code">oss://dashscope-instant/xxx/2024-07-18/xxx/cat.png</code>。</p></li></ul></li><li id="ed7f104352x53"><p id="68942c6c4e0e0">传入 Base64 编码图像后的字符串</p><ul id="a61c8a2e8fyac"><li id="6c59ae3a04g58"><p id="62b078fd63ca1">示例值：<code data-tag="code" class="code react-markdown-blog-code" id="ab8271af750c4">data:image/jpeg;base64,GDU7MtCZz...</code>（示例已截断，仅做演示）</p></li><li id="8f92b7085cdmb"><p id="41fb9fc82e72i">Base64 编码规范请参见<span data-tag="ph" id="aba6af25cf490" props="china" data-cond-props="china" class="ph"><a href="#907c84c1a6wrm" id="93fc716f44llu" title="" class="xref">通过<span class="help-letter-space"></span>Base64<span class="help-letter-space"></span>编码传入图片</a></span>。</p></li></ul></li></ol></section></section><section id="c3f54455a79tt" class="section"><p id="289927b2ffgkd"><b>text </b><code data-tag="code" code-type="xCode" id="6d8a3d0ac4vwr" class="code"><i>string</i></code><b> （必选）</b></p><p jc="left" uuid="me9dqkg2ebfzqgyrree" id="88451728dfwzx" style="text-align:left">正向提示词，用于描述期望生成的图像内容、风格和构图。</p><p jc="left" uuid="me9dqkg222uqdtoauno" id="a4a5fb596eczh" style="text-align:left">支持中英文，长度不超过<span class="help-letter-space"></span>800<span class="help-letter-space"></span>个字符，每个汉字、字母、数字或符号计为一个字符，超过部分会自动截断。</p><p jc="left" uuid="me9dqkg27kmdkm9gzh6" id="26fcba2a44bkw" style="text-align:left">示例值：图<span class="help-letter-space"></span>1<span class="help-letter-space"></span>中的女生穿着图<span class="help-letter-space"></span>2<span class="help-letter-space"></span>中的黑色裙子按图<span class="help-letter-space"></span>3<span class="help-letter-space"></span>的姿势坐下，保持其服装、发型和表情不变，动作自然流畅。</p><p jc="left" uuid="metrcjk1yd1lbqmfgbr" id="2d281ee7a1mwo" style="text-align:left"><b>注意</b>：仅支持传入一个<span class="help-letter-space"></span>text，不传或传入多个将报错。</p></section>
      </div>
    </section>
  </section>
      </div>
    </section>
  </section>
      </div>
    </section>
  </section></td></tr><tr id="7a204d9e36k3h" outputclass="test" class="test"><td id="05a62a76d53un" rowspan="1" style="vertical-align:middle" colspan="1"><section id="b3e5e9944a28q" class="section"><p id="b11fdde708xem"><b>parameters</b> <code data-tag="code" code-type="xCode" id="d019b6eb8d3kg" class="code"><i>object</i></code> （可选）</p><p id="1d7aebfd43vvk">控制图像生成的附加参数。</p>
    <section class="collapse expanded" id="dec3d98f21mhh">
      <div class="expandable-title-bold">
        <span class="title"><p id="c10f5d358dgp6" data-tag="expandable-title" class="expandable-title"><b>属性</b></p></span>
        <i class="icon help-iconfont help-icon-zhankai1 smallFont"></i>
      </div>
      <div class="expandable-content">
        <section id="5060e56ff3h8x" class="section"><p id="0591e237dez21"><b>n</b> <code data-tag="code" code-type="xCode" id="186ea99ea8f89" class="code"><i>integer</i></code> （可选）</p><p id="aa115dba386e9">输出图像的数量，默认值为<span class="help-letter-space"></span>1。</p><p id="f55f0cd8d1d5o">对于<span class="help-letter-space"></span>qwen-image-2.0<span class="help-letter-space"></span>系列、qwen-image-edit-max、qwen-image-edit-plus<span class="help-letter-space"></span>系列模型，可选择输出<span class="help-letter-space"></span>1-6<span class="help-letter-space"></span>张图片。</p><p id="e34c473190zmo">对于<code data-tag="code" id="ef3332e4f4ljg" data-init-id="748d3cec82hy0" class="code">qwen-image-edit</code>，仅支持输出<span class="help-letter-space"></span>1<span class="help-letter-space"></span>张图片。</p></section><section id="2aa98347c9bzj" class="section"><p id="697da44e42eiu"><b>negative_prompt</b> <code data-tag="code" code-type="xCode" id="14455a9f7dglm" class="code"><i>string</i></code> （可选）</p><p jc="left" uuid="me9dpqevm411zrnfvke" id="5b331fce90h09" style="text-align:left">反向提示词，用来描述不希望在画面中看到的内容，可以对画面进行限制。</p><p jc="left" uuid="me9dpqevbpx8081ams" id="027b0abbf42hp" style="text-align:left">支持中英文，长度上限<span class="help-letter-space"></span>500<span class="help-letter-space"></span>个字符，每个汉字、字母、数字或符号计为一个字符，超过部分会自动截断。</p><p jc="left" uuid="me9dpqevfd3zfauw71e" id="6efb32f16d94r" style="text-align:left">示例值：低分辨率、错误、最差质量、低质量、残缺、多余的手指、比例不良等。</p></section><section id="0e360df4915xx" class="section"><p id="e0fbf9a0b2pqr" data-init-id="c042137751rzl"><b>size</b> <code data-tag="code" code-type="xCode" id="181046794aohj" data-init-id="9ee4660868nv9" class="code"><i>string</i></code> （可选）</p><p id="f68b8dafb2fdo" data-init-id="c50477982addn">设置输出图像的分辨率，格式为<code data-tag="code" id="6cf01512b1hoz" data-init-id="e75cced7ddnbq" class="code">宽*高</code>，例如<code data-tag="code" id="d5790ad26btdi" class="code">"1024*1536"</code>。</p><p id="f68b8dafb2fd1"><b>qwen-image-2.0<span class="help-letter-space"></span>系列模型</b>：</p><ul id="f331c3912afhj"><li id="59a298fabdlkr"><p id="b6cc555bad2xm">图像总像素需在<span class="help-letter-space"></span>512*512<span class="help-letter-space"></span>至<span class="help-letter-space"></span>2048*2048<span class="help-letter-space"></span>之间。</p></li><li id="2e6bd6d3cc4yd"><p id="0a9d6bf3b49tp">默认分辨率与输入图（多图输入时为最后一张）一致。</p></li></ul><p id="f68b8dafb2fd2"><b>qwen-image-edit-max、qwen-image-edit-plus<span class="help-letter-space"></span>系列模型</b>：</p><ul id="791b6d99eect8"><li id="4b3956e8c4dub"><p id="d223add9b5yxc">宽和高的取值范围均为[512, 2048]像素。</p></li><li id="ab3cddc2f1m32"><p id="5906f694ddtyo">默认总像素数接近&nbsp;<code data-tag="code" class="code inline-code___exakR" id="3220957f892n7">1024*1024</code>，宽高比与输入图（多图输入时为最后一张）相近。</p></li></ul><blockquote id="9eae1122a2mhv">指定 <code data-tag="code" class="code qwen-markdown-codespan" id="84dd803fd23cg">size</code> 参数，系统会以&nbsp;<code data-tag="code" uuid="ml4tposuf85nvmw2vnv" id="8c908b9083ng8" class="code">size</code>指定的宽高为目标，将实际输出图像的宽高调整为最接近的<span class="help-letter-space"></span>16<span class="help-letter-space"></span>的倍数。例如，设置<code data-tag="code" id="a76fed7ff5btm" class="code">1033*1032</code>，输出图像尺寸为<code data-tag="code" id="30c42a8f78jgl" class="code">1040*1024</code>。</blockquote>
    <section class="collapse expanded" id="size-ratio-list">
      <div class="expandable-title-bold">
        <span class="title"><p id="size-ratio-title" data-tag="expandable-title" class="expandable-title">常见比例推荐分辨率</p></span>
        <i class="icon help-iconfont help-icon-zhankai1 smallFont"></i>
      </div>
      <div class="expandable-content">
        <ul id="size-ratio-ul"><li id="ratio-1-1"><p id="p-ratio-1-1">1:1: 1024*1024、1536*1536</p></li><li id="ratio-2-3"><p id="p-ratio-2-3">2:3: 768*1152、1024*1536</p></li><li id="ratio-3-2"><p id="p-ratio-3-2">3:2: 1152*768、1536*1024</p></li><li id="ratio-3-4"><p id="p-ratio-3-4">3:4: 960*1280、1080*1440</p></li><li id="ratio-4-3"><p id="p-ratio-4-3">4:3: 1280*960、1440*1080</p></li><li id="ratio-9-16"><p id="p-ratio-9-16">9:16: 720*1280、1080*1920</p></li><li id="ratio-16-9"><p id="p-ratio-16-9">16:9: 1280*720、1920*1080</p></li><li id="ratio-21-9"><p id="p-ratio-21-9">21:9: 1344*576、2048*872</p></li></ul>
      </div>
    </section>
  <p id="d4b76e335bkdx" data-init-id="f522872070evv"><b>支持模型</b>：除<code data-tag="code" id="80f4f20a2eagt" class="code">qwen-image-edit</code>以外的模型。</p></section><section id="e2aeaf0d93cy9" class="section"><p id="039b7cc396bts"><b>prompt_extend</b> <code data-tag="code" code-type="xCode" id="1ceaa74521ngb" data-init-id="a97b3fdf5acuw" class="code"><i>bool</i></code> （可选） </p><p uuid="mhvlp3wu3ig26wfx9lf" id="c7159f2f3c2tr">是否开启提示词智能改写，默认值为 <code data-tag="code" id="3fa03d7efdfzf" data-init-id="bba61dd479ane" class="code">true</code>。开启后，模型会优化正向提示词（<code data-tag="code" id="text-param-ref" class="code">text</code>），对描述较简单的提示词效果提升明显。</p><p id="73ace10a56dzt"><b>支持模型</b>：除<code data-tag="code" id="8d4e946d0fy7b" class="code">qwen-image-edit</code>以外的模型。</p></section><section id="6ad068bceff56" class="section"><p id="804e877751tn9" data-init-id="294d7d8f02ufr"><b>watermark</b> <code data-tag="code" code-type="xCode" id="260fdba6f8j9f" data-init-id="2b6cba9dfd3t2" class="code"><i>bool</i></code> （可选） </p><p uuid="m0ku51w10fympmapw55o" id="d91d5ebc72oat" data-init-id="f41bdc06a0abq">是否在图像右下角添加 "Qwen-Image" 水印。默认值为 <code data-tag="code" uuid="mfl0ph4y4b8d8eqc21c" id="dacc88244dhtz" data-init-id="debac1cf0fc4x" class="code">false</code>。水印样式如下：</p><p uuid="mhu0khiadomh4hsvm88" id="ff0fe9293a87t" data-init-id="f41bdc06a0abq"><img id="ca03175b6b1yk" src="https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/8972029571/p1012089.jpg" data-src="https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/8972029571/p1012089.jpg" alt="1" placement="inline" height="35" width="117.099" data-init-id="1f43d4c796wzz" class="image inline lazy-media lazy-loaded"></p></section><section id="aaf226d282kea" class="section"><p id="b4ee875005nuh"><b>seed</b> <code data-tag="code" code-type="xCode" id="a8dc8963eblay" data-init-id="186ea99ea8f89" class="code"><i>integer</i></code> （可选）</p><p id="cd631502d14lw">随机数种子，取值范围<code data-tag="code" id="b14c01c95bx29" class="code">[0,2147483647]</code>。</p><p id="f41cbcdef6nu1">使用相同的<code data-tag="code" class="code react-markdown-blog-code" id="528d154898f4h">seed</code>参数值可使生成内容保持相对稳定。若不提供，算法将自动使用随机数种子。</p><p id="ccd735464998g"><b>注意</b>：模型生成过程具有概率性，即使使用相同的<code data-tag="code" class="code react-markdown-blog-code" id="ea4672cf23or5">seed</code>，也不能保证每次生成结果完全一致。</p></section>
      </div>
    </section>
  </section></td></tr></tbody></table></section>
````



## 响应参数

````<table bordertype="no-border" id="48a817b0e9t30" outputclass="api-reference column-layout" tablewidth="100" tablecolswidth="53.54 46.46" autofit="true" class="api-reference column-layout table table-no-border"><colgroup colwidth="1.07*" style="width:53.54%"></colgroup><colgroup colwidth="0.93*" style="width:46.46%"></colgroup><tbody class="tbody"><tr id="953bd00a219mf" outputclass="test" class="test"><td id="dc82dca896sol" rowspan="1" style="vertical-align:top" colspan="1"><h4 id="b7e833ee1f962" outputclass="test" class="test" data-spm-anchor-id="0.0.0.i5.184c707fFNDFz8">响应参数</h4></td><td id="b48ba03f55xdw" rowspan="6" style="vertical-align:top" colspan="1"><section id="e138c09a48j0m" data-tag="tabbed-content-box" outputclass="tabbed-content-box" class="tabbed-content-box section"><div class="tab-box"><div class="tab-item-container"><div class="tab-item selected-tab-item" id="64fb21fd98plx">任务执行成功</div><div class="tab-item" id="eb0dd4f027fc5">任务执行异常</div></div><div class="tab-box-button" style="visibility: hidden;">
  <div class="left deactivateBtn"><i class="help-iconfont help-icon-zhankai1"></i></div>
  <div class="right"><i class="help-iconfont help-icon-zhankai1"></i></div>
  </div></div><section id="2297bf0b09lsh" class="section" style="display: block;"><section id="9dbdc809e36m1" data-ref-searchable="yes" docid="4720193" data-source="reuse_library" is-conref="true" class="section"><p id="1f99fcb4e25m8">任务数据（如任务状态、图像<span class="help-letter-space"></span>URL<span class="help-letter-space"></span>等）仅保留<span class="help-letter-space"></span>24<span class="help-letter-space"></span>小时，超时后会被自动清除。请您务必及时保存生成的图像。</p></section>
    <div class="help-code-block">
      <div class="code-tools">
        <div class="left-tools">
        </div>
        <div class="right-tools">
          <i class="theme-switch-btn help-iconfont help-icon-baitian" title="更改代码主题"></i>
      <i class="copy-btn help-iconfont help-icon-fuzhi" title="复制代码"></i>
        </div>
      </div>
      <pre code-type="xCode" id="7fd21d5961ovj" index="0" data-tag="codeblock" outputclass="language-json" class="pre codeblock language-json"><code data-highlighted="yes" class="hljs language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">"output"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">"choices"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-punctuation">{</span>
                <span class="hljs-attr">"finish_reason"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"stop"</span><span class="hljs-punctuation">,</span>
                <span class="hljs-attr">"message"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
                    <span class="hljs-attr">"role"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"assistant"</span><span class="hljs-punctuation">,</span>
                    <span class="hljs-attr">"content"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
                        <span class="hljs-punctuation">{</span>
                            <span class="hljs-attr">"image"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"https://dashscope-result-sz.oss-cn-shenzhen.aliyuncs.com/xxx.png?Expires=xxx"</span>
                        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
                        <span class="hljs-punctuation">{</span>
                            <span class="hljs-attr">"image"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"https://dashscope-result-sz.oss-cn-shenzhen.aliyuncs.com/xxx.png?Expires=xxx"</span>
                        <span class="hljs-punctuation">}</span>
                    <span class="hljs-punctuation">]</span>
                <span class="hljs-punctuation">}</span>
            <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">"usage"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">"width"</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1536</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">"image_count"</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">"height"</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1024</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">"request_id"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"bf37ca26-0abe-98e4-8065-xxxxxx"</span>
<span class="hljs-punctuation">}</span></code></pre>
    </div>
    </section><section id="f4c13d9715aus" class="section"><section id="c5c794d831oej" class="section"><p id="0fc3ea2dd93vj">如果因为某种原因导致任务执行失败，将返回相关信息，可以通过<span class="help-letter-space"></span>code<span class="help-letter-space"></span>和<span class="help-letter-space"></span>message<span class="help-letter-space"></span>字段明确指示错误原因。请参见<a href="https://help.aliyun.com/zh/model-studio/error-code" id="5ada5aa98dmk5" title="" class="xref">错误信息</a>进行解决。</p></section>
    <div class="help-code-block">
      <div class="code-tools">
        <div class="left-tools">
        </div>
        <div class="right-tools">
          <i class="theme-switch-btn help-iconfont help-icon-baitian" title="更改代码主题"></i>
      <i class="copy-btn help-iconfont help-icon-fuzhi" title="复制代码"></i>
        </div>
      </div>
      <pre code-type="xCode" id="77200b9bd6x8n" index="0" data-tag="codeblock" outputclass="language-json" class="pre codeblock language-json"><code data-highlighted="yes" class="hljs language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">"request_id"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"31f808fd-8eef-9004-xxxxx"</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">"code"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"InvalidApiKey"</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">"message"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"Invalid API-key provided."</span>
<span class="hljs-punctuation">}</span></code></pre>
    </div>
    </section></section></td></tr><tr id="42cbd87952zlt"><td id="0dd5021b67fzo" rowspan="1" style="vertical-align:middle" colspan="1"><p id="dda331ed6frml"><b>output</b> <code data-tag="code" code-type="xCode" id="63156937ffru1" class="code"><i>object</i></code> </p><p id="a5adaac09cgck">包含模型生成结果。</p>
    <section class="collapse expanded" id="93e7f0d7e4keq">
      <div class="expandable-title-bold">
        <span class="title"><p id="4d34a52f0cwse" data-tag="expandable-title" class="expandable-title"><b>属性</b></p></span>
        <i class="icon help-iconfont help-icon-zhankai1 smallFont"></i>
      </div>
      <div class="expandable-content">
        <section id="d31dc7bd42453" class="section"><p id="862bfa7e880x8"><b>choices</b> <code data-tag="code" id="d1a0c4d44fuwr" class="code"><i>array</i></code></p><p jc="left" id="86afe12ff51tm" style="text-align:left">结果选项列表。</p>
    <section class="collapse expanded" id="e9b6cb9c5clw7">
      <div class="expandable-title-bold">
        <span class="title"><p id="9e0049f6cfjvj" data-tag="expandable-title" class="expandable-title"><b>属性</b></p></span>
        <i class="icon help-iconfont help-icon-zhankai1 smallFont"></i>
      </div>
      <div class="expandable-content">
        <section id="f281b85b50r8v" class="section"><p id="5de287e20f0fb"><b>finish_reason</b>&nbsp;<code data-tag="code" code-type="xCode" id="4a8f4987a6ksv" class="code"><i>string</i></code></p><p jc="left" id="0f89c5640f74i" style="text-align:left">任务停止原因，自然停止时为<code data-tag="code" id="de14fc819bj0z" class="code">stop</code>。</p></section><section id="c279dfe076gin" class="section"><p id="200fd5e4e6e4d"><b>message</b> <code data-tag="code" code-type="xCode" id="6085620dd98cq" data-init-id="925ad8357bx8l" class="code"><i>object</i></code></p><p jc="left" id="3748258f42mit" style="text-align:left">模型返回的消息。</p>
    <section class="collapse expanded" id="8f71d65383rxt">
      <div class="expandable-title-bold">
        <span class="title"><p id="dbf6d7ceeeb5o" data-tag="expandable-title" class="expandable-title"><b>属性</b></p></span>
        <i class="icon help-iconfont help-icon-zhankai1 smallFont"></i>
      </div>
      <div class="expandable-content">
        <section id="beca31c63bguu" class="section"><p id="eb13be8460nhs"><b>role </b><code data-tag="code" id="d128363a8687h" data-init-id="ad982596c06zy" class="code"><i>string</i></code> </p><p id="9069f584d9hw9">消息的角色，固定为<code data-tag="code" code-type="xCode" class="code" id="e0614c5d45no2">assistant</code>。</p></section><section id="cf83c9e6723lz" class="section"><p id="6d2f0b36d8ktv"><b>content </b><code data-tag="code" id="c092828988qjw" data-init-id="e4d2984ef2r5j" class="code"><i>array</i></code> </p><p id="5495b179f9uex">消息内容，包含生成的图像信息。</p>
    <section class="collapse expanded" id="229d07229bpuy">
      <div class="expandable-title-bold">
        <span class="title"><p id="38865f2106k9v" data-tag="expandable-title" class="expandable-title"><b>属性</b></p></span>
        <i class="icon help-iconfont help-icon-zhankai1 smallFont"></i>
      </div>
      <div class="expandable-content">
        <section id="356d9f1832iuf" class="section"><p id="8eefa91aaevp3"><b>image</b> <code data-tag="code" id="0b43bbd2eb47u" data-init-id="ad982596c06zy" class="code"><i>string</i></code> </p><p id="c2dd2fc319dnm">生成图像的 URL，格式为<span class="help-letter-space"></span>PNG。<b>链接有效期为<span class="help-letter-space"></span>24<span class="help-letter-space"></span>小时</b>，请及时下载并保存图像。</p></section>
      </div>
    </section>
  </section>
      </div>
    </section>
  </section>
      </div>
    </section>
  </section>
      </div>
    </section>
  </td></tr><tr id="f0300ea3e3np6"><td id="d1e14dec01z12" rowspan="1" colspan="1"><section id="ab6208da34feg" class="section"><p id="df008a97ec6nn"><b>usage</b> <code data-tag="code" code-type="xCode" id="1259b38a34h5z" data-init-id="63156937ffru1" class="code"><i>object</i></code> </p><p id="25c0dff477jxv">本次调用的资源使用情况，仅调用成功时返回。</p>
    <section class="collapse expanded" id="33da99ae16ncb">
      <div class="expandable-title-bold">
        <span class="title"><p id="ed0f82adb24bz" data-tag="expandable-title" class="expandable-title"><b>属性</b></p></span>
        <i class="icon help-iconfont help-icon-zhankai1 smallFont"></i>
      </div>
      <div class="expandable-content">
        <section id="dc1f0e2c16dpt" class="section"><p id="c4d8a5e75332n"><b>image_count</b> <code data-tag="code" code-type="xCode" id="d05347fe57ioy" class="code"><i>integer</i></code></p><p id="50e340eec2bw4">生成图像的张数。</p></section><section id="13f1739f5fabd" class="section"><p id="2310247ec5j93"><b>width</b> <code data-tag="code" code-type="xCode" id="4885aa239f6wl" data-init-id="d05347fe57ioy" class="code"><i>integer</i></code></p><p id="1f0c205ea3kfn">生成图像的宽度（像素）。</p></section><section id="8f75eef9dckpd" class="section"><p id="6a04b24dd6hjd"><b>height</b> <code data-tag="code" code-type="xCode" id="0897017853023" data-init-id="d05347fe57ioy" class="code"><i>integer</i></code></p><p id="0fc197eba4171">生成图像的高度（像素）。</p></section>
      </div>
    </section>
  </section></td></tr><tr id="975bba72df389" outputclass="test" class="test"><td id="64fb8df556rpc" rowspan="1" style="vertical-align:middle" colspan="1"><section id="26ff5251b8zi5" data-ref-searchable="yes" docid="4720193" data-source="reuse_library" is-conref="true" class="section"><p id="f8ad0d8e5fmh3"><b>request_id </b><code data-tag="code" code-type="xCode" id="3f24e7a18c86z" class="code"><i>string</i></code><i> </i></p><p id="50e43a8e01stk">请求唯一标识。可用于请求明细溯源和问题排查。</p></section></td></tr><tr id="a129ed78dc401"><td id="897d26defd3ty" rowspan="1" colspan="1"><section id="9f6d51a6c26hm" data-ref-searchable="yes" docid="4720193" data-source="reuse_library" is-conref="true" class="section"><p id="0e54bb3abdsfz"><b>code </b><code data-tag="code" code-type="xCode" id="747a126bbd65i" class="code"><i>string</i></code></p><p id="b634d3711cwim">请求失败的错误码。请求成功时不会返回此参数，详情请参见<a href="https://help.aliyun.com/zh/model-studio/error-code" id="8ce79bbfb6xfs" title="" class="xref">错误信息</a>。</p></section></td></tr><tr id="eee56846e9kjz"><td id="3afc5937a4qir" rowspan="1" colspan="1"><section id="6b8490930fpqv" data-ref-searchable="yes" docid="4720193" data-source="reuse_library" is-conref="true" class="section"><p id="aa9502135bkcx"><b>message </b><code data-tag="code" code-type="xCode" id="319e9daaccg6n" class="code"><i>string</i></code></p><p id="49943cf91bcyu">请求失败的详细信息。请求成功时不会返回此参数，详情请参见<a href="https://help.aliyun.com/zh/model-studio/error-code" id="201837a58b7du" title="" class="xref">错误信息</a>。</p></section></td></tr></tbody></table>````