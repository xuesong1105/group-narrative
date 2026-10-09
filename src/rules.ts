export type WidgetKind =
  | 'love-packet'
  | 'clean-packet'
  | 'incident'
  | 'countdown'
  | 'quote'
  | 'debt'
  | 'negation'
  | 'plato'
  | 'ex-vote'
  | 'ticket'
  | 'gift'
  | 'heartbeat'

export type Rule = {
  no: number
  cn: string
  tag: string
  title: string
  text: string
  story: string
  widget: WidgetKind
}

export const INCIDENT_AT = new Date('2026-05-23T18:30:00+08:00').getTime()
export const REVEAL_AT = new Date('2027-05-01T00:00:00+08:00').getTime()

export const rules: Rule[] = [
  {
    no: 1,
    cn: '第一条',
    tag: '经济条例',
    title: '恋爱税',
    text: '群成员恋爱时刻，要在群里发50元红包。',
    story:
      '爱情是私事，红包是公事。脱单的那一刻，请先把喜悦折算成五十元，交给群。群友不负责祝福的真诚程度，只负责抢得够快。',
    widget: 'love-packet',
  },
  {
    no: 2,
    cn: '第二条',
    tag: '风纪条例',
    title: '清流公约',
    text: '本群禁止聊颜涩话题，互相监督，违者发1元红包。',
    story:
      '人人都是纪检委员。一元钱不多，但足够让人记住这一次——也足够让下一位违规者有红包可抢。',
    widget: 'clean-packet',
  },
  {
    no: 3,
    cn: '第三条',
    tag: '大事记',
    title: '裂变峡谷事变',
    text: '公元2026/05/23 18:30 裂变峡谷事变。',
    story:
      '史书只留下了一个精确到分钟的时间。至于那天傍晚峡谷里究竟发生了什么，亲历者各执一词，旁观者讳莫如深。时间不会停，事变也不会被忘记。',
    widget: 'incident',
  },
  {
    no: 4,
    cn: '第四条',
    tag: '悬案',
    title: '松哥是不是我哥',
    text: '松哥是不是我哥呢（2027年5月见分晓）。',
    story:
      '一个问题被郑重写进了群规，还附上了揭晓日期。在那之前，所有猜测都只是猜测。我们能做的，只有等待。',
    widget: 'countdown',
  },
  {
    no: 5,
    cn: '第五条',
    tag: '语录',
    title: '最幸运之人',
    text: '最幸运之人 教练：“所以我们要实现共产主义”。',
    story:
      '没人记得前面说了什么，但每个人都记得这个“所以”。从此，这句话被镌刻进群规，成为本群最具远见的结论。',
    widget: 'quote',
  },
  {
    no: 6,
    cn: '第六条',
    tag: '债务',
    title: '一条腿',
    text: '欢笑欠猫猫一条腿。',
    story:
      '这是一笔无法用红包结清的债。没有借据，没有期限，只有群规为证。猫猫在等，群友在看。',
    widget: 'debt',
  },
  {
    no: 7,
    cn: '第七条',
    tag: '悬案',
    title: '凯文的双重否定',
    text: '凯文不是不是萝莉控。',
    story:
      '起草者在这里用了两个“不是”。是笔误，是修辞，还是一个精心设计的逻辑陷阱？请亲手数一数“不是”。',
    widget: 'negation',
  },
  {
    no: 8,
    cn: '第八条',
    tag: '悬案',
    title: '薛定谔的柏拉图',
    text: '李哥不是不是柏拉图。',
    story:
      '同样的句式，同样的悬而未决。在你翻开卡片之前，李哥既是柏拉图，又不是柏拉图。',
    widget: 'plato',
  },
  {
    no: 9,
    cn: '第九条',
    tag: '风纪条例',
    title: '常态化净网行动',
    text: '常态化净网行动，不能出现太EX的语句以及词汇，投票超过3人觉得EX发一块。',
    story:
      '“EX”的标准交给群众。一个人觉得EX不算，两个、三个也不算——第四只手举起来的那一刻，罚款生效。',
    widget: 'ex-vote',
  },
  {
    no: 10,
    cn: '第十条',
    tag: '遗憾',
    title: '猫猫的演出',
    text: '遗憾的是我们仍然没有看过猫猫的演出。',
    story:
      '票根已经印好，座位已经留出，灯光也一直亮着。只差一个时间，和一个地点。',
    widget: 'ticket',
  },
  {
    no: 11,
    cn: '第十一条',
    tag: '议题',
    title: '李哥的婚礼',
    text: '李哥结婚，我们应该如何随礼呢。',
    story:
      '一个群规里罕见的问句。考虑到第八条尚无定论，这道题显得更加深奥。先把账算清楚，总没有错。',
    widget: 'gift',
  },
  {
    no: 12,
    cn: '第十二条',
    tag: '终章',
    title: '本群不允许死亡',
    text: '本群不允许死亡。',
    story:
      '最后一条，也是最重要的一条。红包会被抢完，悬案会被揭晓，债会还，婚会结——但这个群，要一直活着。',
    widget: 'heartbeat',
  },
]
