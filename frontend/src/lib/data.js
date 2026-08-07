const filterType = {
    all: "Tất cả",
    pending: "Đang chờ xử lý",
    completed: "Hoàn thành",
}

const statusList = {
    pending: "đang chờ xử lý",
    completed: "đã hoàn thành",
}

const options = [
    {key: 'today', label: 'Hôm nay'},
    {key: 'week', label: 'Tuần này'},
    {key: 'month', label: 'Tháng này'},
    {key: 'all', label: 'Tất cả'}
];

const visibleTaskLimit = 4;

export {filterType, statusList, options, visibleTaskLimit};