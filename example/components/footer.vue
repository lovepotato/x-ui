<style lang="less" type="text/less" scoped>
    .page-footer { 
        padding: 30px 0 28px; 
        color: #6190E8; 
        text-align: center; 
        background-color: #fff; 
        box-shadow: 0 4px 30px 0
        rgba(223,225,230,0.8); 
        .footer-container{ 
            width: 90%; 
            margin: 0 auto; 
        } 
        .text-left { 
            font-size: 12px; 
            display: flex;
            align-items: center; 
            color: #5e6d82; 
            img{ 
                border-radius: 100%; 
                margin-right: 10px; 
            } 
            a { 
                color: #6190E8; 
            } 
        }
    }

</style>

<template>
    <div class="page-footer" :style="{position: footPosition, bottom:1+'px', width:100+'%'}">
        <div class="footer-container">
            <div> 一款组件库 </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ui-footer',
        props:{
            footPosition : {
                type: String,
                default: 'absolute'
            }
        }
    }
</script>