// 点击‘去注册账户；的链接·
$(function () {
    // 点击注册按钮
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    });
    // 点击去登录的按钮
    $('#link_reg').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    });
    
    //  从layui中获取form对象  \s不能有空格
    // var form = layui.form;
    // var layer = layui.layer;
    const { form, layer } = layui;
    // 通过form.verify（)函数自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/,'密码必须6-12位,且不能出现空格'],
        repwd: function (value) {
            const pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return "两次输入密码不一致";
            }
        }
    });
    // 监听注册表单的提交事件

    $('#form-reg').on('submit', function (e) {
        // 1. 阻止默认的提交行为，不阻止就会刷新
        e.preventDefault()
        // 2. 发起Ajax的POST请求

        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: (res) => {
                if (res.status !== 0) {
                    layer.msg(res.message || '注册失败');
                    return;
                }

                layer.msg(res.message || '注册成功');
                // 自动跳转登录界面
                $('#link_login').click();

            }
        });
    });
    // 监听表单提交事件
    $('#form_login').on('submit',(function (e) {
        e.preventDefault();

        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message || '注册失败');
                    return;
                }
                layer.msg('登陆成功');
                // 跳转到后台
                localStorage.setItem('token',res.token);  //保存至浏览器本地
                location.href = '/index.html';  //跳转页面
            }

        });
    })

});
