module.exports = function printInventory(inputs) {
    var allItems = loadAllItems();
var loadPromotion = loadPromotions();
function loadAllItems() {
    return [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
}

function loadPromotions() {
    return [
        {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        }
    ];
}
function statistics(items){
	var result = [];
	items.forEach(item=>{
		if (item.length > 10) {
			var barcode = item.split("-")[0];
			var num = parseInt(item.split("-")[1]);
			result = count(result,barcode,num);
		} else {
			result = count(result,item,1);
		}
	});
	return result;
}
function count(result,barcode,count){
	if (result.some(ele => ele.barcode === barcode)) {
		var index = result.findIndex(ele => ele.barcode === barcode);
		result[index].count += count;
		result[index].subtotal += count*result[index].price;
	} else {
		result.push(loadAllItem(barcode,count));
	}
	return result;
}

function loadAllItem(barcode,count){
	var result = {};
	var index = allItems.findIndex(ele => ele.barcode === barcode);
	result = {
		barcode: barcode,
		name: allItems[index].name,
		unit: allItems[index].unit,
		price: allItems[index].price,
		count: count,
		subtotal : allItems[index].price * count
	}
	return result;
}
function Promotion(arr){
	var promotion = [];
	arr.forEach(item => {
		if(loadPromotion[0].barcodes.includes(item.barcode)){
			promotion.push({name:item.name,unit:item.unit,subtotal:item.price});
			item.count;
			item.subtotal -= item.price;
		}
	});
	return promotion;
}
function summary(arr){
	var sum = 0;
	arr.forEach(item => {
		sum += item.subtotal;
	});
	return sum;
}
var result = statistics(inputs);
var promotion = Promotion(result);
var sum = summary(result);
var save = summary(promotion);
var str = '***<没钱赚商店>购物清单***\n';
result.forEach(item => {
	str += '名称：'+item.name+'，数量：'+item.count+item.unit+'，单价：'+item.price.toFixed(2)+'(元)，小计：'+item.subtotal.toFixed(2)+'(元)\n'
});
str += '----------------------\n挥泪赠送商品：\n';
promotion.forEach(item => {
	str += '名称：'+item.name+'，数量：1'+item.unit+'\n'
});
str += '----------------------\n总计：'+sum.toFixed(2)+'(元)\n节省：'+save.toFixed(2)+'(元)\n**********************'
console.log(str);
};