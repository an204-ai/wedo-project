const Footer = ({completedTaskCount, pendingTaskCount }) => {
    return (
        <div className="flex flex-col gap-2 mx-2 sm:flex-row justify-center">
            {
                completedTaskCount + pendingTaskCount > 0 && (
                    completedTaskCount === 0 ?
                    <span className="text-sm text-muted-foreground">
                        Mau bắt đầu một công việc nào!
                    </span>
                    : completedTaskCount > 0 && pendingTaskCount === 0 ? 
                    <span className="text-sm text-muted-foreground">
                        Tuyệt vời! Bạn đã hoàn thành tất cả công việc!
                    </span>
                    :  
                    <span className="text-sm text-muted-foreground">
                        Bạn đã hoàn thành {completedTaskCount} công việc, chỉ còn {pendingTaskCount} việc nữa thôi.
                    </span>
                ) 
            } 
        </div>
    );
};
export default Footer;