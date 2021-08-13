import graphene
from graphene_django import DjangoObjectType

from ingredients.models import Category, Ingredient

class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = ("id", "name", "ingredients")

class IngredientType(DjangoObjectType):
    class Meta:
        model = Ingredient
        fields = ("id", "name", "notes", "category")

class CategoryInput(graphene.InputObjectType):
    id = graphene.ID()
    name = graphene.String(required=True)

class IngredientInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    notes = graphene.String(required=True)
    # category = graphene.Field(CategoryInput)



class CategoryMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        id = graphene.ID()
    category = graphene.Field(CategoryType)
    @classmethod
    def mutate(cls,root,info,name,id):
        category = Category.objects.get(pk=id)
        category.name = name
        category.save()
        return CategoryMutation(category=category)

class CreateCategoryMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String()
    category = graphene.Field(CategoryType)
    OK = graphene.String()
    @classmethod
    def mutate(cls,root,info,name):
        print(name)
        category = Category(name=name)
        category.save()
        OK = '分类创建成功'
        return CreateCategoryMutation(category=category,OK=OK)


class CreateIngredients(graphene.Mutation):
    class Arguments:
        ingredient_data = IngredientInput(required=True)
        category_id = graphene.Int()

    ingredient = graphene.Field(IngredientType)

    @staticmethod
    def mutate(root,info,ingredient_data,category_id):
        ingredient = Ingredient(
            **ingredient_data,category=Category.objects.filter(pk=category_id).first()
        )
        ingredient.save()
        # ingredient = Ingredient(
        #     name = ingredient_data.name,
        #     notes = ingredient_data.notes,
        #     # category = Category.objects.get(pk=1)
        #     category = ingredient_data.category
        #
        # )
        # ingredient.save()

        return CreateIngredients(ingredient=ingredient)


class Query(graphene.ObjectType):
    all_ingredients = graphene.List(IngredientType)
    all_category = graphene.List(CategoryType)
    category_by_name = graphene.Field(
        CategoryType, name=graphene.String(required=True)
    )

    def resolve_all_ingredients(root, info):
        # We can easily optimize query count in the resolve method
        return Ingredient.objects.select_related("category").all()

    def resolve_category_by_name(root, info, name):
        try:
            return Category.objects.get(name=name)
        except Category.DoesNotExist:
            return None

    def resolve_all_category(root,info):
        return Category.objects.all()

class Mutation(graphene.ObjectType):
    update_category = CategoryMutation.Field()
    create_category = CreateCategoryMutation.Field()
    create_ingredient = CreateIngredients.Field()

schema = graphene.Schema(query=Query,mutation=Mutation)

# 使用django-filter插件
# import graphene
#
# import ingredients.schema
# class Query(ingredients.schema.Query,graphene.ObjectType):
#     pass
#
#
# schema = graphene.Schema(query=Query)
