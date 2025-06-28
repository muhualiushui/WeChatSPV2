import Toast from 'tdesign-miniprogram/toast/index';
import Dialog from 'tdesign-miniprogram/dialog/index';
import { OrderButtonTypes } from '../../config';

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    order: {
      type: Object,
      observer(order) {
        // 订单的button bar
        const buttonsRight = (order.buttons || [])
          .filter((b) => b.type !== OrderButtonTypes.APPLY_REFUND && b.type !== OrderButtonTypes.VIEW_REFUND)
          .map((button) => {
            //邀请好友拼团按钮
            if (button.type === OrderButtonTypes.INVITE_GROUPON && order.groupInfoVo) {
              const {
                groupInfoVo: { groupId, promotionId, remainMember, groupPrice },
                goodsList,
              } = order;
              const goodsImg = goodsList[0] && goodsList[0].imgUrl;
              const goodsName = goodsList[0] && goodsList[0].name;
              return {
                ...button,
                openType: 'share',
                dataShare: {
                  goodsImg,
                  goodsName,
                  groupId,
                  promotionId,
                  remainMember,
                  groupPrice,
                  storeId: order.storeId,
                },
              };
            }
            return button;
          });
        // 删除订单按钮单独挪到左侧
        const deleteBtnIndex = buttonsRight.findIndex((b) => b.type === OrderButtonTypes.DELETE);
        let buttonsLeft = [];
        if (deleteBtnIndex > -1) {
          buttonsLeft = buttonsRight.splice(deleteBtnIndex, 1);
        }
        this.setData({
          buttons: {
            left: buttonsLeft,
            right: buttonsRight,
          },
        });
      },
    },
    goodsIndex: {
      type: Number,
      value: null,
    },
    isBtnMax: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    order: {},
    buttons: {
      left: [],
      right: [],
    },
  },

  methods: {
    // 点击【订单操作】按钮，根据按钮类型分发
    onOrderBtnTap(e) {
      const { type } = e.currentTarget.dataset;
      switch (type) {
        case OrderButtonTypes.DELETE:
          this.onDelete(this.data.order);
          break;
        case OrderButtonTypes.CANCEL:
          this.onCancel(this.data.order);
          break;
        case OrderButtonTypes.CONFIRM:
          this.onConfirm(this.data.order);
          break;
        case OrderButtonTypes.PAY:
          this.onPay(this.data.order);
          break;
        case OrderButtonTypes.COMMENT:
          this.onAddComment(this.data.order);
          break;
        case OrderButtonTypes.INVITE_GROUPON:
          //分享邀请好友拼团
          break;
        case OrderButtonTypes.REBUY:
          this.onBuyAgain(this.data.order);
      }
    },

    onCancel() {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '你点击了取消订单',
        icon: 'check-circle',
      });
    },

    onConfirm() {
      Dialog.confirm({
        title: '确认是否已经收到货？',
        content: '',
        confirmBtn: '确认收货',
        cancelBtn: '取消',
      })
        .then(() => {
          Toast({
            context: this,
            selector: '#t-toast',
            message: '你确认了确认收货',
            icon: 'check-circle',
          });
        })
        .catch(() => {
          Toast({
            context: this,
            selector: '#t-toast',
            message: '你取消了确认收货',
            icon: 'check-circle',
          });
        });
    },

    onPay() {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '你点击了去支付',
        icon: 'check-circle',
      });
    },

    onBuyAgain() {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '你点击了再次购买',
        icon: 'check-circle',
      });
    },


    /** 添加订单评论 */
    onAddComment(order) {
      const imgUrl = order?.goodsList?.[0]?.thumb;
      const title = order?.goodsList?.[0]?.title;
      const specs = order?.goodsList?.[0]?.specs;
      wx.navigateTo({
        url: `/pages/goods/comments/create/index?specs=${specs}&title=${title}&orderNo=${order?.orderNo}&imgUrl=${imgUrl}`,
      });
    },
  },
});
