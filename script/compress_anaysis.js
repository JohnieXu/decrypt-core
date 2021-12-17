/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
const fs = require('fs')
const path = require('path')
const { encrypt } = require('../lib/crypt')

function getByteLength(str) {
  const te = new TextEncoder()
  return te.encode(str).length
}

/**
 * 生成长度为 length 字节的随机字符串
 * @param {Number} length 字节长度（最小为 2）
 * @param {String} type 类型 0：中英文混合，1：中文，2：英文
 */
function genRandomString(length, type = '0') {
  const enDicts = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const zhDicts = '我在年青时候也曾经做过许多梦，后来大半忘却了，但自己也并不以为可惜。所谓回忆者，虽说可以使人欢欣，有时也不免使人寂寞，使精神的丝缕还牵着已逝的寂寞的时光，又有什么意味呢，而我偏苦于不能全忘却，这不能全忘的一部分，到现在便成了《呐喊》的来由。我有四年多，曾经常常，——几乎是每天，出入于质铺和药店里，年纪可是忘却了，总之是药店的柜台正和我一样高，质铺的是比我高一倍，我从一倍高的柜台外送上衣服或首饰去，在侮蔑里接了钱，再到一样高的柜台上给我久病的父亲去买药。回家之后，又须忙别的事了，因为开方的医生是最有名的，以此所用的药引也奇特：冬天的芦根，经霜三年的甘蔗，蟋蟀要原对的，结子的平地木，……多不是容易办到的东西。然而我的父亲终于日重一日的亡故了。有谁从小康人家而坠入困顿的么，我以为在这途路中，大概可以看见世人的真面目；我要到N进K学堂去了，仿佛是想走异路，逃异地，去寻求别样的人们。我的母亲没有法，办了八元的川资，说是由我的自便；然而伊哭了，这正是情理中的事，因为那时读书应试是正路，所谓学洋务，社会上便以为是一种走投无路的人，只得将灵魂卖给鬼子，要加倍的奚落而且排斥的，而况伊又看不见自己的儿子了。然而我也顾不得这些事，终于到N去进了K学堂了，在这学堂里，我才知道世上还有所谓格致、算学、地理、历史、绘图和体操。生理学并不教，但我们却看到些木版的《全体新论》和《化学卫生论》之类了。我还记得先前的医生的议论和方药，和现在所知道的比较起来，便渐渐的悟得中医不过是一种有意的或无意的骗子，同时又很起了对于被骗的病人和他的家族的同情；而且从译出的历史上，又知道了日本维新是大半发端于西方医学的事实。因为这些幼稚的知识，后来便使我的学籍列在日本一个乡间的医学专门学校里了。我的梦很美满，预备卒业回来，救治像我父亲似的被误的病人的疾苦，战争时候便去当军医，一面又促进了国人对于维新的信仰。我已不知道教授微生物学的方法，现在又有了怎样的进步了，总之那时是用了电影，来显示微生物的形状的，因此有时讲义的一段落已完，而时间还没有到，教师便映些风景或时事的画片给学生看，以用去这多余的光阴。其时正当日俄战争的时候，关于战事的画片自然也就比较的多了，我在这一个讲堂中，便须常常随喜我那同学们的拍手和喝采。有一回，我竟在画片上忽然会见我久违的许多中国人了，一个绑在中间，许多站在左右，一样是强壮的体格，而显出麻木的神情。据解说，则绑着的是替俄国做了军事上的侦探，正要被日军砍下头颅来示众，而围着的便是来赏鉴这示众的盛举的人们。这一学年没有完毕，我已经到了东京了，因为从那一回以后，我便觉得医学并非一件紧要事。凡是愚弱的国民，即使体格如何健全，如何茁壮，也只能做毫无意义的示众的材料和看客，病死多少是不必以为不幸的。所以我们的第一要著，是在改变他们的精神，而善于改变精神的是，我那时以为当然要推文艺，于是想提倡文艺运动了。在东京的留学生很有学法政理化以至警察工业的，但没有人治文学和美术；可是在冷淡的空气中，也幸而寻到几个同志了，此外又邀集了必须的几个人，商量之后，第一步当然是出杂志，名目是取“新的生命”的意思，因为我们那时大抵带些复古的倾向，所以只谓之《新生》。'.split('')
  function pick(len, dicts) {
    const result = []
    for (let i = 0; i < len; i++) {
      const index = Math.floor(Math.random() * dicts.length)
      result.push(dicts[index])
    }
    return result
  }
  if (length < 2) {
    length = 2
  }
  // 英文
  if (type === '2') {
    if (length % 2 !== 0) {
      length += 1
    }
    return {
      result: pick(length / 2, enDicts).join(''),
      length,
    }
  }
  // 中文
  if (type === '1') {
    const r = length % 3
    if (r !== 0) {
      length += (3 - r)
    }
    return {
      result: pick(length / 3, enDicts).join(''),
      length,
    }
  }
  // 中英混合
  if (type === '0') {
    const r = length % 5
    if (r !== 0) {
      length += (5 - r)
    }
    let result = []
    let tlen = length
    while (tlen > 0) {
      result = result.concat(pick(1, enDicts)).concat(pick(1, zhDicts))
      tlen -= 2
    }
    return {
      result,
      length,
    }
  }
}

function writeResult(result) {
  const readme = fs.readFileSync(path.resolve('./README.md'), 'utf-8')
  const nreadme = readme.replace('<--anaysis-->', JSON.stringify(result, null, 2))
  fs.writeFileSync(path.resolve('./README.md'), nreadme)
}

function start() {
  const typeMap = {
    2: '英文',
    1: '中文',
    0: '中文混合',
  }
  const lens = [
    [1, '2'], // 1byte
    [100, '2'], // 10byte
    [1000, '2'], // 100byte
    [10 * 1000, '2'], // 1Kb
    [50 * 1000, '2'], // 5Kb
    [100 * 1000, '2'], // 10Kb
    // [1000 * 1000, '2'], // 1Mb
    // [10 * 1000 * 1000, '2'], // 10Mb
    [1, '1'],
    [100, '1'],
    [1000, '1'],
    [10 * 1000, '1'],
    [50 * 1000, '1'],
    [100 * 1000, '1'],
    // [1000 * 1000, '1'],
    // [10 * 1000 * 1000, '1'],
    [1, '0'],
    [100, '0'],
    [1000, '0'],
    [10 * 1000, '0'],
    [50 * 1000, '0'],
    [100 * 1000, '0'],
    // [1000 * 1000, '0'],
    // [10 * 1000 * 1000, '0'],
  ]
  const key = '12345678901234567890123456789012'
  const result = []

  for (let i = 0; i < lens.length; i++) {
    const len = lens[i][0]
    const type = lens[i][1]
    console.log('开始生成随机字符串')
    const { result: data, length } = genRandomString(len, type)
    console.log('生成随机字符串结束', length)

    console.log('开始加密')
    const timeStart = Date.now()
    const encrypted = encrypt(data, key)
    const timeEnd = Date.now()
    console.log('加密结束')

    const encLength = getByteLength(encrypted)

    const obj = {
      length: `${length}byte`,
      encLength: `${encLength}byte`,
      time: `${timeEnd - timeStart}ms`,
      ratio: `${((encLength * 100) / length).toFixed(4)}%`,
      type: typeMap[type],
    }
    result.push(obj)

    console.log(`${i + 1} DONE\n`)
  }
  console.log(result)
  writeResult(result)
}

start()
