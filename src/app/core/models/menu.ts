export class Menu {
  id: string
  name: string
  iconClass: string
  status: string
  parentId: string
  menuList: Menu[]
  menuAction: MenuAction
}


export class MenuAction {
  moduleName: string
  actionName: string
  iconClass: string
  url: string
}
