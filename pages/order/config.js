export const OrderStatus = {
  PENDING_PAYMENT: 5, // 待支付
  PENDING_DELIVERY: 10, // 待发货
  PENDING_RECEIPT: 40, // 待收货
  COMPLETE: 50, // 已完成/待评价
  PAYMENT_TIMEOUT: 80, // 已取消，支付超时
  CANCELED_NOT_PAYMENT: 80, // 已取消，未支付主动取消
  CANCELED_PAYMENT: 80, // 已取消，已支付主动取消
  CANCELED_REJECTION: 80, // 已取消，拒收
};


// 订单按钮类型
export const OrderButtonTypes = {
  PAY: 1, // 付款
  CANCEL: 2, // 取消订单
  CONFIRM: 3, // 确认收货
  COMMENT: 6, // 评价
  DELETE: 7, // 删除订单
  DELIVERY: 8, // 查看物流
  REBUY: 9, // 再次购买
  INVITE_GROUPON: 11, //邀请好友拼团
};


// 物流节点
export const LogisticsNodeTypes = {
  SUBMITTED: 200001, // 已提交订单
  PAYMENTED: 200002, // 已付款/已下单
  SHIPPED: 200003, // 已发货
  CANCELED: 200004, // 已取消
  RECEIVED: 200005, // 已签收
  ADDRESS_CHANGED: 200006, // 已修改地址
  IN_TRANSIT: 200007, // 运输中
};

export const LogisticsIconMap = {
  [LogisticsNodeTypes.SUBMITTED]: '',
  [LogisticsNodeTypes.PAYMENTED]: 'credit_card',
  [LogisticsNodeTypes.SHIPPED]: 'deliver',
  [LogisticsNodeTypes.CANCELED]: '',
  [LogisticsNodeTypes.RECEIVED]: 'check',
  [LogisticsNodeTypes.ADDRESS_CHANGED]: '',
  [LogisticsNodeTypes.IN_TRANSIT]: 'yunshuzhong',
};
