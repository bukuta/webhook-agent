# webhook-agent 

在gitlab或者github上托管代码，当仓库有更新时，可以自动触发一些脚本

```puml
```

```mermaid
graph BT;  
view --action--> view-models;  
view-models --数据更新--> view  
view-models --接口调用--> snc;  
snc --持有--> collection;  
snc --持有-->model; 
model --调用--> dataprovider;
collection --持有--> model;
collection --调用--> dataprovider;
collection --引用--> datahub;
model --引用--> datahub;
```

```uml
@startuml                     
title __webhook-agent__实体关系

"User" "*" -- "*" "Project"
"Project" "1" -- "1" "ProjectConfig"
"Project" "1" -- "*" "Hook"
"Hook" "1" -- "*" "Action"
"Action" "1" -- "1" "Env"
"Action" "1" -- "*" "Task"
"Action" "1" -- "*" "Notice"
"Action" "1" -- "1" "Filters"
"Notice" "1" -- "*" "NoticeTemplate"
"Task" "1" -- "*" "Log"
"Project" "1" -- "*" "Log"

class User{
    + name
    + password
}
class Project{
    + creator
    + coworkers
    + configs
}
class ProjectConfig{
    + name
    + value
}
class Hook{
    + project
    + creator
    + type
    + filters
}
class Action{
    + creator
    + project
    + hook
    + type
    + params
    + excutor
}
class Task{
    + time
    + project
    + hook
    + action
    + notice
}
class Notice{
    + creator
    + action
    + targets
    + template
}
class NoticeTemplate{
    + creator
    + content
}
class Log{
    + time
    + task
    + project
}
class Filters{
    + branch
    + sender
    + tag
}
class Env{
    + name
    + value
}

@enduml
```

