import { AppIcon } from "../utils/app_icon.js"


const FOOTER_LIST_ITEMS = [
    {
        label: 'Upgrade plan',
        icon: 'message_circle'
    },
    {
        label: 'Personalization',
        icon: 'star'
    },
    {
        label: 'Profile',
        icon: 'profile'
    },
    {
        label: 'Settings',
        icon: 'settings'
    },


]

const FOOTER_LIST_BOTTOM_ITEMS = [
    {
        label: 'Help',
        icon: 'help'
    },
    {
        label: 'Logout',
        icon: 'logout'
    },
]

export const renderSidebarFooterMenu = () => {
    const footer_account_el = document.querySelector('.sidebar__footer-account')
    const sidebar_menu_el = document.querySelector('.sidebar__footer-menu') 
    
    

    footer_account_el.addEventListener('click',()=>{
       sidebar_menu_el.classList.toggle('sidebar__footer-menu--hide')
    })


    sidebar_menu_el.innerHTML = `
            <li class="sidebar__footer-menu__list sidebar__footer-menu__list-account">
            <div class="sidebar__footer-info">
                        <div class="sidebar__footer-avatar" aria-hidden="true"><span>A</span></div>
                        <span class="sidebar__footer-details">
                            <span class="sidebar__footer-name">Anuj</span>
                            <span class="sidebar__footer-plan">Free</span>
                        </span>
                    </div>

                    ${AppIcon({ iconName: "chevron_right", size: 20, strokeWidth: 1 })}
            </li>
            <hr class="sidebar__footer-menu__separator"/>
    `

    FOOTER_LIST_ITEMS.forEach((item) => {
        const list_item = document.createElement('li')
        list_item.classList.add('sidebar__footer-menu__list')
        list_item.innerHTML = `
        
        ${AppIcon({ iconName: item.icon })}
        
        <span>${item.label}</span>

        `
        sidebar_menu_el.append(list_item)
    })
    const separator = document.createElement('hr');
    separator.className = 'sidebar__footer-menu__separator';
    sidebar_menu_el.appendChild(separator);

    FOOTER_LIST_BOTTOM_ITEMS.forEach((item) => {
        const list_item = document.createElement('li')
        list_item.classList.add('sidebar__footer-menu__list')
        list_item.innerHTML = `
        
        ${AppIcon({ iconName: item.icon })}
        
        <span>${item.label}</span>

        `
        sidebar_menu_el.append(list_item)
    })
}